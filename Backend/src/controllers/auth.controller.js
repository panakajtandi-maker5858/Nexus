import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";







/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 */
export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ email }, { username }]
        })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User with this email or username already exists",
                success: false,
                err: "User already exists"
            })
        }

        const user = await userModel.create({ username, email, password })

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Register error:", err)
        res.status(500).json({
            message: "Registration failed",
            success: false,
            err: err.message
        })
    }
}




/*
@desc Login user and return JWT token 
@route POST  /api/auth/login
@access  Public 
@body { email , password}
*/


export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
                err: "User not found"
            })
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
                err: "Incorrect password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({
            message: "Login failed",
            success: false,
            err: err.message
        })
    }
}


/*
@desc Get current logged in user's details
@route GET   /api/auth/get-me 
@access  Private 
*/

export async function getMe(req, res) {
    const userId = req.user.id 

    const user = await userModel.findById(userId).select("-password")

    if(!user) {
        return res.status(404).json({
            message: "User not found" ,
            success: false ,
            err : "User not found"
        })
    }

    res.status(200).json({
        message: 'User details fetched successfully' ,
        success: true ,
        user 
    })


}




/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
export async function logout(req, res) {
    
    
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
})
res.status(200).json({
        message: "Logout successful",
        success: true,
    })
}