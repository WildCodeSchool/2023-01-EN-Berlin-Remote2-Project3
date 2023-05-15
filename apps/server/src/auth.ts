import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { prisma } from "./index";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export interface LoginRequest extends Request {
  body: { email: string; password: string };
  user?: { id: number; typeId: number; password: string };
}

export interface LoginRequestWithData extends LoginRequest {
  user: { id: number; typeId: number; password: string };
}

export const validateRequestEmailPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body?.email;
  const password = req.body?.password;
  if (!email || !password) {
    res.status(400).send("Invalid request: no email or password provided");
  } else if (typeof email !== "string" || typeof password !== "string") {
    res
      .status(400)
      .send("Invalid request: forbidden value provided as email or password");
  } else {
    // Cleanup request body in case unnecessary properties are present
    req.body = { email: email, password: password };
    next();
  }
};

export const getUserByEmailPassword = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction
) => {
  //Quering the database. Checking if the email exists
  prisma.user
    .findUnique({
      select: { id: true, typeId: true, password: true },
      where: { email: req.body.email },
    })
    .then((found) => {
      if (found == null) {
        res.status(404).send("Wrong email or password");
      } else {
        // now we have the user and can proceed with the verification
        //after adding the userpassword to the response
        console.log("User found");
        req.user = found;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

export const verifyPassword = async (
  req: LoginRequestWithData,
  res: Response
) => {
  const jwtSecretKey = process.env.JWT_SECRET ?? "";
  if (!jwtSecretKey) {
    console.error("No JWT_SECRET defined in .env file");
  }
  const pass = req.body.password;
  const hash = req.user.password;
  if (pass === hash) {
    console.log("Sending the token");
    const payload = { sub: req.user.id };
    const token = jwt.sign(payload, jwtSecretKey, {
      expiresIn: "8h",
    });
    const { password, ...info } = req.user;
    res.status(200).send({ token, info });
  } else {
    console.log("Wrong password");
    res.status(404).send("Wrong email or password");
  }
  // argon2
  //   .verify(hash, pass)
  //   .then((isVerified) => {
  //     if (isVerified) {
  //       console.log("Password is correct");
  //       const payload = { sub: req.body.user.id };
  //       const token = jwt.sign(payload, jwtSecretKey, {
  //         expiresIn: "8h",
  //       });
  //       const { password, ...info } = req.body.user;
  //       res.send({ token, info });
  //     } else {
  //       console.log("Wrong password");
  //       res.status(404).send("Wrong email or password");
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.sendStatus(500);
  //   });
};
