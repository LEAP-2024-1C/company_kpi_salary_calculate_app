import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { generateGmail, sendEmailWithLink } from "../utils/sentGmail";
import crypto from "crypto";

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log("first", email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Not found user" });
    }
    const isCheck = bcrypt.compareSync(password, user.password);
    if (!isCheck) {
      res.status(402).json({ message: "Not match user email or password" });
    } else {
      const token = generateToken({ id: user.id });
      res.status(200).json({
        message: "success",
        token,
      });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

export const logup = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }

    // console.log("first", hashedPassword);
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(200).json({ message: "success", user: createdUser });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};