import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

require("dotenv").config();

const authVerify = (req: Request, res: Response, next: NextFunction) => {
  const token: any =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      code: res.statusCode,
      message: "User is not authorized to access this resource.",
    });
  }

  if (token.indexOf("Bearer") !== 0) {
    return res.status(401).json({
      code: res.statusCode,
      message: "Error: Token format invalid",
    });
  }

  const tokenString = token.split(" ")[1];

  try {
    const decodedToken: any = jwt.verify(
      tokenString,
      String(process.env.JWT_SECRET)
    );

    if (!decodedToken.role) {
      return res.status(401).json({
        code: res.statusCode,
        message: "Error: Role missing",
      });
    }

    res.locals.role = decodedToken.role;
    res.locals.id = decodedToken.id;
    // if (roles.indexOf(userRole) === -1) {
    //   return res.status(401).json({ message: "Error: User not authorized" });
    // }

    // Token is valid, proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      code: res.statusCode,
      message: "Error: Broken or expired token",
    });
  }
};

export default authVerify;
