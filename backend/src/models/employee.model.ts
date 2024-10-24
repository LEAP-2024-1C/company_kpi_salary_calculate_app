import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IEmployee {
  _id: Schema.Types.ObjectId;
  firstName: String;
  lastName: String;
  email: String;
  password: string;
  role: String;
  job_title: String;
  phoneNumber?: String;
  profile_img?: String;
  address?: String;
  otp?: String;
  passwordResetToken?: String;
  passwordResetTokenExpire?: Date;
  created_at: Date;
  updated_at: Date;
}
const employeeSchema = new Schema<IEmployee>({
  firstName: { type: String, required: [true, "Хэрэглэгчийн нэрийг оруулах"] },
  lastName: { type: String, required: [true, "Хэрэглэгчийн нэрийг оруулах"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Хэрэглэгчийн имейл оруулах"],
  },
  password: {
    type: String,
    minlength: [8, "Хэрэглэгчийн пасс хамгийн багадаа 8 тэмдэгт байна"],
    required: [true, "Хэрэглэгчийн түлхүүр үг оруулах"],
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
  job_title: {
    type: String,
    required: [true, "Хэрэглэгчийн түлхүүр үг оруулах"],
  },
  phoneNumber: String,
  profile_img: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  address: String,
  otp: {
    type: String,
    default: null,
  },
  passwordResetToken: { type: String, default: "" },
  passwordResetTokenExpire: { type: Date, default: undefined },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
  }
});
const Employee = model("Employee", employeeSchema);
export default Employee;
