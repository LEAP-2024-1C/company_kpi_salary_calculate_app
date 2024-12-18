import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  job_title: string;
  verified: boolean;
  status: string;
};
export interface IUser {
  _id: string;

  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: number;
  job_title: string;
  verified: boolean;
  status: string;
  profile_img: string;
}

export interface IStatus {
  pending: number;
  progress: number;
  done: number;
  review: number;
  assign: number;
}

export interface IProductStat {
  product_id: string;
  components: IStatus;
  total: number;
  description: string;
  productName: string;
  images?: string[];
  createdAt: string;
}

export type Product = {
  _id: string;
  productName: string;
  quantity: number;
  images: string[];
  components: string[];
  employees: [];
  description: string;
  status: number;
};
export interface IProduct {
  productName: string;
  description: string;
  quantity: string;
}
export type Procedures = {
  taskName: string;
  unitPrice: number;
  quantity: number;
  status: Status;
  proCheck?: boolean;
  _id: string;
};

export type Category = {
  _id: string;
  categoryName: string;
  procedures: Procedures[];
};
export interface Status {
  pending: number;
  progress: number;
  done: number;
  review: number;
}

export const navItems: NavItem[] = [
  {
    title: 'Хяналтын хуудас',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Хэрэглэгч',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Бүтээгдэхүүн',
    href: '/dashboard/product',
    icon: 'product',
    label: 'product'
  },
  {
    title: 'Ангилал',
    href: '/dashboard/category',
    icon: 'category',
    label: 'category'
  },
  {
    title: 'Профайл',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },

  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
