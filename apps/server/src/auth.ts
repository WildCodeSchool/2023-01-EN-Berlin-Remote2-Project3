import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import express, { Express, Request, Response } from "express";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// Should it be a function?

// const checkJwtSecretKey = (): string => {
//   const envSecret = process.env.JWT_SECRET;
//   if (envSecret === undefined) {
//     console.error("No JWT_SECRET defined in .env file");
//     return "";
//   } else {
//     return envSecret;
//   }
// };

let jwtSecretKey = "";
const envSecret = process.env.JWT_SECRET;
if (envSecret === undefined) {
  console.error("No JWT_SECRET defined in .env file");
} else {
  jwtSecretKey = envSecret;
}

const verifyPassword = async (req: Request, res: Response) => {
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

module.exports = {
  verifyPassword,
};
