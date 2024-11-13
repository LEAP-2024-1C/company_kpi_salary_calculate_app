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
  // id: number;
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
  id: number;
  productName: string;
  category: string;
  price: number;
  qty: number;
  images: string[];
  description: string;
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
export const products: Product[] = [
  {
    id: 1,
    productName: 'Wireless Mouse',
    category: 'Electronics',
    price: 29.99,
    qty: 150,
    images: ['mouse1.jpg', 'mouse2.jpg'],
    description:
      'Ergonomic wireless mouse with adjustable DPI settings and long battery life.'
  },
  {
    id: 2,
    productName: 'Gaming Keyboard',
    category: 'Electronics',
    price: 79.99,
    qty: 100,
    images: ['keyboard1.jpg', 'keyboard2.jpg'],
    description:
      'Mechanical gaming keyboard with customizable RGB lighting and tactile keys.'
  },
  {
    id: 3,
    productName: 'Running Shoes',
    category: 'Sportswear',
    price: 59.99,
    qty: 200,
    images: ['shoes1.jpg', 'shoes2.jpg'],
    description:
      'Lightweight running shoes designed for comfort and durability.'
  },
  {
    id: 4,
    productName: 'Smartwatch',
    category: 'Wearables',
    price: 199.99,
    qty: 75,
    images: ['watch1.jpg', 'watch2.jpg'],
    description:
      'Water-resistant smartwatch with heart-rate monitoring and GPS tracking.'
  },
  {
    id: 5,
    productName: 'Noise Cancelling Headphones',
    category: 'Electronics',
    price: 249.99,
    qty: 60,
    images: ['headphones1.jpg', 'headphones2.jpg'],
    description:
      'High-fidelity noise-cancelling headphones with wireless Bluetooth connectivity.'
  },
  {
    id: 6,
    productName: 'Yoga Mat',
    category: 'Sportswear',
    price: 19.99,
    qty: 500,
    images: ['yogamat1.jpg', 'yogamat2.jpg'],
    description:
      'Eco-friendly yoga mat with non-slip surface and extra cushioning.'
  },
  {
    id: 7,
    productName: '4K Ultra HD TV',
    category: 'Electronics',
    price: 899.99,
    qty: 35,
    images: ['tv1.jpg', 'tv2.jpg'],
    description:
      '55-inch 4K Ultra HD smart TV with HDR and streaming capabilities.'
  },
  {
    id: 8,
    productName: 'Coffee Maker',
    category: 'Appliances',
    price: 129.99,
    qty: 120,
    images: ['coffeemaker1.jpg', 'coffeemaker2.jpg'],
    description:
      'Automatic coffee maker with programmable settings and built-in grinder.'
  },
  {
    id: 9,
    productName: 'Office Chair',
    category: 'Furniture',
    price: 149.99,
    qty: 85,
    images: ['chair1.jpg', 'chair2.jpg'],
    description:
      'Ergonomic office chair with adjustable height and lumbar support.'
  },
  {
    id: 10,
    productName: 'Electric Kettle',
    category: 'Appliances',
    price: 39.99,
    qty: 300,
    images: ['kettle1.jpg', 'kettle2.jpg'],
    description:
      'Stainless steel electric kettle with fast boiling and automatic shut-off.'
  }
];

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Product',
    href: '/dashboard/product',
    icon: 'product',
    label: 'product'
  },
  {
    title: 'Category',
    href: '/dashboard/category',
    icon: 'category',
    label: 'category'
  },
  {
    title: 'Profile',
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
