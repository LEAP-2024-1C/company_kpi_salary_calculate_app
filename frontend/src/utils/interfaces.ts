// export interface ITask {
//     id:string;
//     totalTasks:number;
//     completedTasks:number
//     taskName:string
//     price:number
// }
export interface IEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  job_title: string;
  phoneNumber?: string;
  profile_img?: string;
  address?: string;
  otp?: string;
  passwordResetToken?: string;
  passwordResetTokenExpire?: Date;
  created_at: Date;
  updated_at: Date;
}
export interface IProduct {
  _id: string;
  productName: string;
  description: string;
  images: [string];
  quantity: number;
  status: number;
  components: IComponents[];
}
export interface IProductStat {
  components: IComps[];
  productName: string;
  description: string;
  image: [string];
  createdAt: string;
  quantity: number;
  _id: string;
}

export interface IComps {
  categoryName: string;
  cat_id: string;
  total: number;
  other: number;
}
export interface IComponents {
  categoryName: string;
  _id: string;
  procedures: IProcedures[];
}
export interface IProcedures {
  taskName: string;
  quantity: number;
  status: IStatus;
  unitPrice: number;
  _id: string;
  taskStatus: string;
}
export interface IStatus {
  pending: number;
  progress: number;
  done: number;
  review: number;
  assign: number;
}

export interface ISavedComponents {
  _id: string;
  categoryName: string;
  procedures: IProcedures[];
}

export interface ISaveTasks {
  _id: string;
  taskName: string;
  unitPrice: number;
  quantity: number;
  selectedQuantity: number;
}
export interface ISavedTasks {
  user: string;
  products: ISavedProduct[];
}
export interface ISavedProduct {
  product_id: string;
  productName: string;
  components: ISavedComponents[];
}

export interface IChooseTasks {
  component_id: string;
  procedures: IProcedures[];
}
