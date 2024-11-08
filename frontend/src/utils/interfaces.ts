// export interface ITask {
//     id:string;
//     totalTasks:number;
//     completedTasks:number
//     taskName:string
//     price:number
// }
export interface IEmployee {
  _id: string;
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
}
export interface IStatus {
  pending: number;
  progress: number;
  done: number;
  review: number;
  assign: number;
}

export interface ISaveTasks {
  _id: string;
  taskName: string;
  unitPrice: number;
  quantity: number;
  selectedQuantity: number;
}
// export interface ISavedTasks {
//   products: ISavedProduct[];
// }
export interface ISavedProduct {
  product_id: string;
  productName: string;
  components: ISavedComponents[];
}
export interface ISavedComponents {
  _id: string;
  categoryName: string;
  procedures: ITask[];
}

export interface ISaveTasks{
    _id:string;
    taskName:string
    unitPrice:number
    quantity:number
    selectedQuantity:number }
  export interface ISavedTasks {
    user: string;
    products: ISavedProduct[];
  }
  export interface ISavedProduct {
    product_id: string;
    productName: string;
    components: ISavedComponents[];
  }
  export  interface ISavedComponents {
    _id: string;
    categoryName: string;
    procedures: ITask[];}

    export interface ITask {
      _id: string;
      taskName: string;
      quantity: number;
      status: IStatus;
      unitPrice: number;
    }
  export interface SavedTasks{
    products: ISavedProduct
  }
export interface ITask {
  _id: string;
  taskName: string;
  quantity: number;
  status: IStatus;
  unitPrice: number;
}
export interface IChooseTasks {
  component_id: string;
  procedures: IProcedures[];
}
