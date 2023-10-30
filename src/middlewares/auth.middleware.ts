import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Roles } from "../model/user.model";
import { DefaultResponse } from "../helpers/defaultResponse";

require("dotenv").config();

//[Roles.Standard, Roles.Admin, Roles.Standard]
export async function authVerify(
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

    if (!decodedToken.role) {
      return res
        .status(401)
        .json(DefaultResponse.error("Error: Role missing", res.statusCode));
    }

    // const userRole: Roles = decodedToken.role;
    // if (userRole !== Roles.Admin) {
    //   return res
    //     .status(403)
    //     .json(
    //       DefaultResponse.error(
    //         "User is not authorized to access this resource.",
    //         res.statusCode
    //       )
    //     );
    // }

    res.locals.role = decodedToken.role;
    res.locals.id = decodedToken.id;

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

export default authVerify;
