import { Request, Response } from "express";
import Employee from "../models/employee.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

import crypto from "crypto";
import { sendEmail } from "../utils/send-email";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

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
export const getCurrentUser = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const user = await Employee.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Not found user" });
    }
    const { email, profile_img, firstName, lastName, address, phoneNumber } =
      user;
    res.status(200).json({
      message: "success",
      user: { email, profile_img, firstName, lastName, address, phoneNumber },
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    const { email, firstName, lastName, job_title, phoneNumber } = data;

    if (!firstName || !lastName || !email || !job_title) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }

    // console.log("first", hashedPassword);
    const createdEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      job_title,
      phoneNumber,
    });

    res.status(200).json({ message: "success", employee: createdEmployee });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ message: "success", employees });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const findEmployee = await Employee.findOne({ email });
    if (!findEmployee) {
      return res
        .status(400)
        .json({ message: "Бүртгэлтэй хэрэглэгч олдсонгүй" });
    }

    const otp = Math.floor(Math.random() * 10_000)
      .toString()
      .padStart(4, "0");
    findEmployee.otp = otp;

    await findEmployee.save();

    await sendEmail(email, otp);

    res.status(200).json({ message: "OTP code is sent email successfully" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otpValue } = req.body;

  const findUser = await Employee.findOne({ email: email, otp: otpValue });
  if (!findUser) {
    return res
      .status(400)
      .json({ message: "Бүртгэлтэй хэрэглэгч эсвэл OTP код олдсонгүй" });
  }

  //sendEmail
  const resetToken = crypto.randomBytes(25).toString("hex");
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  findUser.passwordResetToken = hashedResetToken;
  findUser.passwordResetTokenExpire = new Date(Date.now() + 10 * 60 * 1000);
  await findUser.save();

  await sendEmail(
    email,
    `<a href="https://company-kpi-salary-calculate-app-pjzk.vercel.app//forgetpass/newpass?resettoken=${resetToken}"&email=${email}>Нууц үг сэргээх холбоос</a>`
  );
  res.status(200).json({ message: "Нууц үг сэргээх имэйл илгээлээ" });
};

export const verifyPassword = async (req: Request, res: Response) => {
  try {
    const { password, resetToken } = req.body;

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const findUser = await Employee.findOne({
      passwordResetToken: hashedResetToken,
      passwordResetTokenExpire: { $gt: Date.now() },
    });

    if (!findUser) {
      return res
        .status(400)
        .json({ message: "Таны нууц үг сэргээх хугацаа дууссан байна:" });
    }

    findUser.password = password;
    await findUser?.save();
    res.status(200).json({ message: "Нууц үг  амжилттэй сэргээлээ" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { email, firstName, lastName, phoneNumber, profile_img } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber || !profile_img) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }

    const update = {
      firstName,
      lastName,
      email,
      phoneNumber,
      profile_img,
    };
    const updatedUser = await Employee.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.status(200).json({ message: "success", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const { u_id } = req.body;

  console.log("req", req.body);

  try {
    if (!u_id) {
      return res.status(400).json({
        message: "Устгалт амжилтгүй: p_id  заавал байх ёстой.",
      });
    }

    const findProduct = await Employee.findByIdAndDelete(u_id);

    return res.status(200).json({
      message: "Бүтээгдэхүүн амжилттай устгав.",
      deletedProduct: findProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Алдаа гарлаа." });
  }
};
