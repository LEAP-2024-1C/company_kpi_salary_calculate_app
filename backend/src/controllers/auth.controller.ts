import { Request, Response } from "express";
import Employee from "../models/employee.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import crypto from "crypto";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("first", email);
  try {
    const user = await Employee.findOne({ email });
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

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password, job_title } = req.body;

    if (!firstName || !lastName || !email || !password || !job_title) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }

    // console.log("first", hashedPassword);
    const createdEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      password,
      job_title,
    });

    res.status(200).json({ message: "success", employee: createdEmployee });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
