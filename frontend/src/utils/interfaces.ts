export interface ITask {
    id:string;
    totalTasks:number;
    completedTasks:number
    taskName:string
    price:number
}
export interface IEmployee {
    _id: string
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
  export interface IProduct {
    id:string;
    productName: string;
    description: string;
    images?: [string];
    quantity: number;
    status: number;
    category: [object];
  }
  // const [productData, setProductData] = useState<IProduct>({
  //   id: "",
  //   productName: "",
  //   description: "",
  //   images: [""],
  //   quantity: 0,
  //   status: 0,
  //   category: [{}],
  // });