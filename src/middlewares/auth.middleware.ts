import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DefaultResponse } from "../helpers/defaultResponse";
import { Roles } from "../model/user.model";

require("dotenv").config();

//[Roles.Standard, Roles.Admin, Roles.Standard]
export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: any =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json(
        DefaultResponse.error(
          "User is not authorized to access this resource.",
          res.statusCode
        )
      );
  }

  if (token.indexOf("Bearer") !== 0) {
    return res
      .status(401)
      .json(
        DefaultResponse.error("Error: Token format invalid", res.statusCode)
      );
  }

  const tokenString = token.split(" ")[1];

  try {
    const decodedToken: any = jwt.verify(
      tokenString,
      String(process.env.JWT_SECRET)
    );

    const userId = decodedToken.id; // Assuming userId is the property name in the decoded token
    const userRole = decodedToken.role; // Assuming userId is the property name in the decoded token

    if (!decodedToken.role) {
      return res
        .status(401)
        .json(DefaultResponse.error("Error: Role missing", res.statusCode));
    }

    res.locals.role = userRole;
    res.locals.id = userId;

    // Token is valid, proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      code: res.statusCode,
      message: "Error: Broken or expired token",
    });
  }
}

export function authorizeUser(roles: Roles[]) {
  return async (_: Request, res: Response, next: NextFunction) => {
    if (roles.length && !roles.includes(res.locals.role)) {
      return res
        .status(403)
        .json(
          DefaultResponse.error(
            "User is not authorized to perform this action..",
            res.statusCode
          )
        );
    }
    next();
  };
}
