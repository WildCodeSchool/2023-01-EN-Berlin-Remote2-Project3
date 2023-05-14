import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";


const prisma = new PrismaClient();

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export const getUserByEmailPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Quering the database. Checking if the email exists
  prisma.user
    .findUnique({
      select: { id: true, password: true },
      where: { email: req.body.email },
    })
    .then((found) => {
      if (found == null) {
        res.status(404).send("Wrong email or password");
      } else {
        // now we have the user and can proceed with the verification
        //after adding the userpassword to the response
        console.log("User found");
        req.body.user = found;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

export const validateRequestEmailPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Validating the request body
  if (req.body?.email === undefined || req.body?.password === undefined) {
    res.status(400).send("Invalid request: no email or password provided");
  } else {
    next();
  }
};

export const verifyPassword = async (req: Request, res: Response) => {
  const jwtSecretKey = process.env.JWT_SECRET ?? "";
  if (!jwtSecretKey) {
    console.error("No JWT_SECRET defined in .env file");
  }
  const pass = req.body.password;
  const hash = req.body.user.password;
  if (pass === hash) {
    console.log("Sending the token");
    const payload = { sub: req.body.user.id };
    const token = jwt.sign(payload, jwtSecretKey, {
      expiresIn: "8h",
    });
    res.status(200).send({ token });
  } else {
    console.log("Wrong password");
    res.status(404).send("Wrong email or password");
  }
  // argon2
  //   .verify(hash, pass)
  //   .then((isVerified) => {
  //     if (isVerified) {
  //       const payload = { sub: req.user.id };
  //       const token = jwt.sign(payload, process.env.JWT_SECRET, {
  //         expiresIn: "1h",
  //       });
  //       delete req.user.hashedPassword;
  //       res.send({ token, user: req.user });
  //     } else {
  //       res.sendStatus(401);
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.sendStatus(500);
  //   });
};
