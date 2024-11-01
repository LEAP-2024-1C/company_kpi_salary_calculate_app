import { NavItem } from '@/types';
import exp from 'constants';

export type User = {
  id: number;
  name: string;
  company: string;
  job_title: string;
  verified: boolean;
  status: string;
};
export interface IUser {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: number;
  job_title: string;
  verified: boolean;
  status: string;
}
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    job_title: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    job_title: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    job_title: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    job_title: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    job_title: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    job_title: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    job_title: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    job_title: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    job_title: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    job_title: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export interface IStatus {
  pending: number;
  progress: number;
  done: number;
  review: number;
}

export interface IProductStat {
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
  proCheck?: boolean;
  _id: string;
};

export type Category = {
  categoryName: string;
  procedures: Procedures[];
};

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
    title: 'Project',
    href: '/dashboard/project',
    icon: 'project',
    label: 'project'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];

// export const categories : Category[]= [
//   {
//       _id: "671afda11208d7373353b1a1",
//       categoryName: "Харма",
//       procedures: [
//           {
//               taskName: "таг 1-р оёо хавчуургатай",
//               quantity: "2",
//               status: "pending",
//               unitPrice: "350",
//               _id: "671afda11208d7373353b1a2"
//           },
//           {
//               taskName: "таг лавчик 0.6",
//               quantity: "2",
//               status: "pending",
//               unitPrice: "200",
//               _id: "671afda11208d7373353b1a3"
//           },
//           {
//               taskName: "харма хадах хос",
//               quantity: "2",
//               status: "pending",
//               unitPrice: "500",
//               _id: "671afda11208d7373353b1a4"
//           },
//           {
//               taskName: "таг хадах",
//               quantity: "2",
//               status: "pending",
//               unitPrice: "200",
//               _id: "671afda11208d7373353b1a5"
//           }
//       ],
//   },
//   {
//       _id: "671aff3f1208d7373353b1aa",
//       categoryName: "Холбох",
//       procedures: [
//           {
//               taskName: "Мөр залгах 1-р",
//               quantity: "2",
//               status: "pending",
//               unitPrice: "200",
//               _id: "671aff3f1208d7373353b1ab"
//           },
//           {
//               taskName: "Мөр лавчик ХОС ногоон",
//               quantity: "4",
//               status: "pending",
//               unitPrice: "450",
//               _id: "671aff3f1208d7373353b1ac"
//           },
//           {
//               taskName: "Ханцуй залгах 1-р",
//               quantity: "1",
//               status: "pending",
//               unitPrice: "600",
//               _id: "671aff3f1208d7373353b1ad"
//           },
//           {
//               taskName: "Ханцуй залгаа лавчик ХОС ногоон",
//               quantity: "20",
//               status: "pending",
//               unitPrice: "1000",
//               _id: "671aff3f1208d7373353b1ae"
//           },
//           {
//               taskName: "Сугалгаа 1-р эгнээ",
//               quantity: "10",
//               status: "pending",
//               unitPrice: "100",
//               _id: "671aff3f1208d7373353b1af"
//           },
//           {
//               taskName: "энгэр сент шидэх",
//               quantity: "10",
//               status: "pending",
//               unitPrice: "200",
//               _id: "671aff3f1208d7373353b1b0"
//           }
//       ],

//   {
//       "_id": "671b00b81208d7373353b1b3",
//       "categoryName": "Дотор",
//       "procedures": [
//           {
//               "taskName": "Зах ширмэл шидэх",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b00b81208d7373353b1b4"
//           },
//           {
//               "taskName": "Борта шидэх",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "120",
//               "_id": "671b00b81208d7373353b1b5"
//           },
//           {
//               "taskName": "өлгүүр бэлдэх хадах шошготой",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b00b81208d7373353b1b6"
//           },
//           {
//               "taskName": "шошгоны суурь оёх",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b00b81208d7373353b1b7"
//           },
//           {
//               "taskName": "мөр холбох дотор",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "50",
//               "_id": "671b00b81208d7373353b1b8"
//           },
//           {
//               "taskName": "зах залгах дотор",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "50",
//               "_id": "671b00b81208d7373353b1b9"
//           },
//           {
//               "taskName": "ханцуй залгах дотор",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "60",
//               "_id": "671b00b81208d7373353b1ba"
//           },
//           {
//               "taskName": "ноосон монжат бэлдэх",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "80",
//               "_id": "671b00b81208d7373353b1bb"
//           },
//           {
//               "taskName": "ханцуйн хажлага битүүлэх",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b00b81208d7373353b1bc"
//           }
//       ],
//       "created_at": "2024-10-25T02:21:44.543Z",
//       "updated_at": "2024-10-25T02:21:44.543Z",
//       "__v": 0
//   },
//   {
//       "_id": "671b04791208d7373353b1bf",
//       "categoryName": "Малгай",
//       "procedures": [
//           {
//               "taskName": "хажлага холбох, оёх, шидэх",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b04791208d7373353b1c0"
//           },
//           {
//               "taskName": "дотор гол залгах",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "200",
//               "_id": "671b04791208d7373353b1c1"
//           },
//           {
//               "taskName": "өнгө гол залгах 1-р /тэлээ/",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "300",
//               "_id": "671b04791208d7373353b1c2"
//           },
//           {
//               "taskName": "өнгө гол лавчик хос",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "400",
//               "_id": "671b04791208d7373353b1c3"
//           },
//           {
//               "taskName": "малгайн цахилгаан өнгөнд оёх",
//               "quantity": "4",
//               "status": "pending",
//               "unitPrice": "500",
//               "_id": "671b04791208d7373353b1c4"
//           },
//           {
//               "taskName": "өнгө дотор хавсрах 1-р сэтлэх өөлөх",
//               "quantity": "4",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b04791208d7373353b1c5"
//           },
//           {
//               "taskName": "малгай тэлээ холбох",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "200",
//               "_id": "671b04791208d7373353b1c6"
//           },
//           {
//               "taskName": "гоёлын оёо",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "200",
//               "_id": "671b04791208d7373353b1c7"
//           },
//           {
//               "taskName": "зангуу оёх",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b04791208d7373353b1c8"
//           }
//       ],
//       "created_at": "2024-10-25T02:37:45.377Z",
//       "updated_at": "2024-10-25T02:37:45.377Z",
//       "__v": 0
//   },
//   {
//       "_id": "671b06c81208d7373353b1cb",
//       "categoryName": "хавсаргах",
//       "procedures": [
//           {
//               "taskName": "Их бие хавсрах энг.зах сэт өөлөх",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b06c81208d7373353b1cc"
//           },
//           {
//               "taskName": "заам сэтлэх шидэх",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "200",
//               "_id": "671b06c81208d7373353b1cd"
//           },
//           {
//               "taskName": "ханцуйны үзүүр хавсрах тэлээ",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "300",
//               "_id": "671b06c81208d7373353b1ce"
//           },
//           {
//               "taskName": "энгэрийн гоёл 0.6",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "400",
//               "_id": "671b06c81208d7373353b1cf"
//           },
//           {
//               "taskName": "ханцуйн үзүүр гоёл",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b06c81208d7373353b1d0"
//           },
//           {
//               "taskName": "хормойн лавчик ",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "200",
//               "_id": "671b06c81208d7373353b1d1"
//           },
//           {
//               "taskName": "ханц, хажлаганд ширмэл шидэх",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "300",
//               "_id": "671b06c81208d7373353b1d2"
//           },
//           {
//               "taskName": "бланк 1-р, лавчик 0,6",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "400",
//               "_id": "671b06c81208d7373353b1d3"
//           },
//           {
//               "taskName": "бланк хадах ",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b06c81208d7373353b1d4"
//           }
//       ],
//       "created_at": "2024-10-25T02:47:36.380Z",
//       "updated_at": "2024-10-25T02:47:36.380Z",
//       "__v": 0
//   },
//   {
//       "_id": "671b265bc3ba8849c38011af",
//       "categoryName": "halaas ",
//       "procedures": [
//           {
//               "taskName": "oydol",
//               "quantity": "1",
//               "status": "pending",
//               "unitPrice": "100",
//               "_id": "671b265bc3ba8849c38011b0"
//           },
//           {
//               "taskName": "induuu",
//               "quantity": "2",
//               "status": "pending",
//               "unitPrice": "500",
//               "_id": "671b265bc3ba8849c38011b1"
//           }
//       ],
//       "created_at": "2024-10-25T05:02:19.518Z",
//       "updated_at": "2024-10-25T05:02:19.518Z",
//       "__v": 0
//   }
// ]
