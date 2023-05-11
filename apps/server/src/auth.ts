import * as argon2 from "argon2";
const jwt = require("jsonwebtoken");
import express, { Express, Request, Response } from "express";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const verifyPassword = async (req: Request, res: Response) => {
  // const hash = req.user.hashedPassword;
  // const pass = req.body.password;
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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ1LCJuYW1lIjoiTHVrYSIsImlhdCI6MTY4MzY0MzExMCwiZXhwIjoxNjgzNjQzNzEwfQ.VLCNJTQpzH4Khne_GoijkAH2QRGEqVHamrfXZwPuQns";

  res.status(200).send({ token });
};

module.exports = {
  verifyPassword,
};
