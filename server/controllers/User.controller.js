import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Name Validation
    if (name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters",
      });
    }

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Password Validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    // =========================
    // CHECK EXISTING USER
    // =========================

    const existingUser =
      await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "Email already registered",
      });
    }

    // =========================
    // HASH PASSWORD
    // =========================

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // =========================
    // CREATE USER
    // =========================

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    // =========================
    // JWT TOKEN
    // =========================

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // =========================
    // RESPONSE
    // =========================

    return res.status(201).json({
      success: true,
      message: "Registration successful",

      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
};

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     res.json({
//       success: true,
//       token,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required!",
      });
    }

    // =========================
    // FIND USER
    // =========================

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    // =========================
    // CHECK PASSWORD
    // =========================

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // =========================
    // JWT TOKEN
    // =========================

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // =========================
    // SUCCESS RESPONSE
    // =========================

    return res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};