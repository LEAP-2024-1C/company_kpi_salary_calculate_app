import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Product = {
  id: number;
  productName: string;
  category: string;
  price: number;
  qty: number;
  images: string[];
  description: string;
};

export type Procedures = {
  taskName: string;
  unitPrice: number;
  unit: number;
  status: string;
};

export type Category = {
  id: number;
  categoryName: string;
  procedures: Procedures[];
  description: string;
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
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
export const categories: Category[] = [
  {
    id: 1,
    categoryName: 'таг харма бэлтгэл',
    procedures: [
      {
        taskName: 'энгэр харманы 0.1',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'э.харманы хагалбар цахилгаантай бэлдэх',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'харма хадах',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'уутан харма бэлдэх',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'уут_харма оёх',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      }
    ],

    description:
      'Ergonomic wireless mouse with adjustable DPI settings and long battery life.'
  },
  {
    id: 2,
    categoryName: 'урд гуя',
    procedures: [
      {
        taskName: 'м_арлын суртай бэлдэх',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'м_арал  энгэрт тогтоох',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'ташаа 5 см  цац',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'өвдгөвч оёх хос хавчуурга',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'элгэвчийг у_гуятай холбох 1-р',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      }
    ],
    description:
      'Mechanical gaming keyboard with customizable RGB lighting and tactile keys.'
  },
  {
    id: 3,
    categoryName: 'ар',
    procedures: [
      {
        taskName: 'бөгсөвч хадах хос',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'ар суудал 1-р',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'ард резин тогтоох',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'ард мөрөвч тогтоох',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'бөгсөвч хадах хос',
        unitPrice: 13,
        unit: 200,
        status: 'pending'
      }
    ],
    description:
      'Lightweight running shoes designed for comfort and durability.'
  },
  {
    id: 4,
    categoryName: 'холбох',
    procedures: [
      {
        taskName: 'ташаа холбох 1-р',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'ташаа лавчик хос',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'харма бөхлөх ',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'алхам 1-р',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      { taskName: 'алхам 0.6', unitPrice: 13, unit: 200, status: 'pending' }
    ],
    description:
      'Water-resistant smartwatch with heart-rate monitoring and GPS tracking.'
  },
  {
    id: 5,
    categoryName: 'өмдний үндсэн дотор',
    procedures: [
      {
        taskName: 'д_элгэвчинд хажлага оёх ',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'д_ ар нуруувч босоо холбох 1-р',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'д_ар_ ну-д шошго оёх',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'ташаа холбох /дээд биений/',
        unit: 150,
        unitPrice: 10,
        status: 'pending'
      },
      {
        taskName: 'д_ урд суудал 1-р',
        unitPrice: 13,
        unit: 200,
        status: 'pending'
      }
    ],
    description:
      'High-fidelity noise-cancelling headphones with wireless Bluetooth connectivity.'
  }
];
