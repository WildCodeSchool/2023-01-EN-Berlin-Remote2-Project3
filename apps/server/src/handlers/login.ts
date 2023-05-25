import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { prisma } from "../index";
import { validateEmail, validatePassword } from "../validators";
import { LoginRequest, LoginRequestWithData, RequestDecodedToken, RequestUserInfo } from "../types";

const jwtSecretKey = process.env.JWT_SECRET ?? "";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export const validateRequestEmailPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body?.email;
  const password = req.body?.password;
  if (validateEmail(email) && validatePassword(password)) {
    // Cleanup request body in case unnecessary properties are present
    req.body = { email: email, password: password };
    next();
  } else {
    res.status(400).send("Wrong email or password");
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
      select: { id: true, typeId: true, name: true, password: true },
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
  if (jwtSecretKey === "") {
    throw new Error("No JWT_SECRET defined in .env file");
  }
  const pass = req.body.password;
  const hash = req.user.password;
  // if (pass === hash) {
  //   console.log("Sending the token");
  //   const payload = { sub: req.user.id };
  //   const token = jwt.sign(payload, jwtSecretKey, {
  //     expiresIn: "8h",
  //   });
  //   const { password, ...user } = req.user;
  //   res.status(200).send({ token, user });
  // } else {
  //   console.log("Wrong password");
  //   res.status(404).send("Wrong email or password");
  // }
  argon2
    .verify(hash, pass)
    .then((isVerified) => {
      if (isVerified) {
        console.log("Password is correct");
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, jwtSecretKey, {
          expiresIn: "8h",
        });
        const { password, ...user } = req.user;
        res.send({ token, user });
      } else {
        console.log("Wrong password");
        res.status(404).send("Wrong email or password");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

export const verifyToken = async (
  req: Request & RequestDecodedToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader === undefined) {
      res.status(401).send("Authorization header is missing");
    } else {
      const [type, token] = authorizationHeader.split(" ");
      if (type !== "Bearer") {
        res
          .status(401)
          .send("Authorization header is not of the 'Bearer' type");
      } else {
        if (jwtSecretKey === "") {
          throw new Error("No JWT_SECRET defined in .env file");
        } else {
          try {
            req.decodedToken = jwt.verify(token, jwtSecretKey);
            next();
          } catch (err) {
            res.status(401).json({ success: false, payload: "Invalid token" });
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

export const getUserByIdAndNext = async (
  req: Request & RequestUserInfo & RequestDecodedToken,
  res: Response,
  next: NextFunction
) => {
  prisma.user
    .findUniqueOrThrow({
      where: { id: +(req.decodedToken.sub ?? 0) },
      select: {
        id: true,
        name: true,
        typeId: true,
        type: { select: { name: true } },
      },
    })
    .then((found) => {
      req.userInfo = {
        id: found.id,
        name: found.name,
        typeId: found.typeId,
        type: found.type.name,
      };
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

export const sendUserInfo = async (req: Request & RequestUserInfo, res: Response) => {
  res.json({
    success: true,
    payload: req.userInfo,
  });
};
