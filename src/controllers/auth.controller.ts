import { Request, Response } from "express";
import UserModel from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        code: res.statusCode,
        message: "All Inputs Required",
      });
    }

    const user = await UserModel.findOne({
      email: email,
    });

    console.log("User is " + user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token: string = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        String(process.env.JWT_SECRET),
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        code: res.statusCode,
        message: "User Logged In Successfully",
        token: token,
      });
    }

    return res.status(400).json({
      code: res.statusCode,
      message: "Invalid Email or Password",
    });
  } catch (error) {
    return res.status(500).json({
      code: res.statusCode,
      message: "Internal Server Error",
      error,
    });
  }
}
export async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        code: res.statusCode,
        message: "All Inputs Required",
      });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    const token: string = await jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      String(process.env.JWT_SECRET)
    );

    return res.status(200).json({
      code: res.statusCode,
      message: "User Registered Successfuly",
      token: token,
    });
  } catch (error: any) {
    return res.status(500).json({
      code: res.statusCode,
      message: "Something went wrong!",
      error,
    });
  }
}
