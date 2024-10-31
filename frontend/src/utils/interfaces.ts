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
  _id:string;
  productName: string;
  description: string;
  images?: [string];
  quantity: number;
  status?: number;
  components: [IComponents];
}
export interface IProductStat{
  components:IComps[]
  productName:string
  description:string
  image:[string]
  createdAt:string
  quantity:number
  _id:string
}

export interface IComps{
  categoryName: string,
  cat_id: string
  total: number
  other: number
}
export interface IComponents {
  _id:string;
  categoryName:string
  procedures:[IProcedures]
}
export interface IProcedures{
  taskName: string;
  quantity:number;
  status?:string;
  unitPrice:number;
  _id?:string
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

  export interface ISavedTasks{
 task:IProduct;
 quantity:number
  }