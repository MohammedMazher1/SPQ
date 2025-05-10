import Backup from '@/app/(dashboard)/setting/taps/backup';

export type SearchParams = {
  page?: number;
  pageSize?: number;
  createdAt?: {
    gte?: string | Date;
    lte?: string | Date;
  };
  id?: {
    equals?: number;
  };
  name?: {
    contains?: string;
  };
  storeName?: {
    contains?: string;
  };
  userName?: {
    contains?: string;
  };
  offerName?: {
    contains?: string;
  };
  orderBy?: {
    createdAt?: 'desc' | 'asc';
  };
  include?: {
    directorate?: {
      include?: {
        governorate?: boolean;
      };
    };
    subCategories?: boolean;
    category?: boolean;
    store?: boolean;
    currency?: boolean;
    product?: boolean;
    governorate?: boolean;
  };
  limit?: number;
  maxPrice?: number;
  storeId?: number;
  productId?: number;
  customerId?: number;
  fromDate?: string;
  toDate?: string;
};
export type OrdersByWeekday = {
  السبت: number;
  الأحد: number;
  الإثنين: number;
  الثلاثاء: number;
  الأربعاء: number;
  الخميس: number;
  الجمعة: number;
};
export type Notification = {
  id: number;
  title: string; // Title can be a string or null
  message: string;
  dateSent: string; // ISO date string
  topic?: string; // Topic can be a string or null
  userId: number;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
export type OrderStats = {
  Delivered?: number;
  Preparing?: number;
  Rejected?: number;
  Pending?: number;
  Accepted?: number;
};

// start  statistic type
type OrderStatus =
  | 'Accepted'
  | 'Pending'
  | 'Preparing'
  | 'Rejected'
  | 'Delivered';

export type MonthlyOrders = {
  [year: string]: {
    [month: string]: {
      [status in OrderStatus]: number;
    };
  };
};

// Define the type for the total orders by status
type TotalOrdersByStatus = {
  [status in OrderStatus]: number;
};

// Define the main interface for the entire structure
export interface StatisticsData {
  totalOrders: number;
  totalStores: number;
  totalProducts: number;
  totalCategories: number;
  totalClients: number;
  monthlyOrders: MonthlyOrders;
  totalOrdersByStatus: TotalOrdersByStatus;
}
// end  statistic type
export type Stats = {
  totalOrders?: number;
  totalClients?: number;
  productCount?: number;
  totalFamilies?: number;
  categoryCount?: number;
  ordersByWeekday?: OrdersByWeekday;
  orderStats?: OrderStats;
};
export type LoginResponse = {
  user: {
    name: string;
    role: number;
  };
  token: string;
};
export type Governorate = {
  id: number;
  name: string;
  directorates?: Directorate[];
};
export type Directorate = {
  id: number;
  name: string;
  governorateId: number;
  governorate?: Governorate;
};
export type Coustomer = {
  id: number;
  name: string;
  address: string;
  profileImage: File | string;
  state: string;
  role: Role;
  governorate: Governorate;
  phone: string;
  email: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  profileImage?: string | File;
  roleId: string;
  role?: Role;
  state?: string;
};
export type Role = {
  id: string;
  roleName: string;
};

export interface Version {
  id: string;
  number: string;
  name: string;
  createdAt: string;
  size: string;
}

export interface ActionProps {
  row: Version;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
  onDownload: (id: string) => void;
}
export type Family = {
  id: number;
  storeName: string;
  description: string;
  contactInfo: string;
  directorate: Directorate;
  userId: number;
  status: number;
  isDeleted?: boolean;
  averageRating: string;
  directorateId?: number;
  address?: string;
  logo: string;
  identityType?: string;
  identityNumber?: string;
  identityIssuedDate?: string;
  identityIssuedBy?: string;
  bankAccountNumber?: string;
  bankName?: string;
};

export type Category = {
  id?: number;
  categoryName: string;
  description: string;
  logo?: string | File | undefined;
  parentCategoryId?: string;
  subCategories?: Category[];
};

export type Currency = {
  id: number;
  name: string;
  code: string;
};

export type Size = {
  id?: number;
  name: string;
  code: string;
};

export type BankAccount = {
  id?: number;
  bankName: string;
  accountNumber: string;
  bankLogo?: File | string;
};

export type UserInfo = {
  id: number;
  address: string;
  email: string;
  phone: string;
  name: string;
  profileImage: string;
  roleName: string;
};
export type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  categoryId: string;
  quantityAvailable: number;
  store: Family;
  category: Category;
  currency: Currency;
};

// Define the OrderItem type
export type OrderItem = {
  id: number;
  quantity: number;
  description: string | null;
  orderId: number;
  productId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

// Define the main Order type
export type Order = {
  id: number;
  totalAmount: number;
  status: string;
  orderDate: string;
  paymentProof: string;
  discrption: string;
  paymentDate: string;
  userId: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  formattedPrice: string;
  user: User;
  items: OrderItem[];
};
export type Offer = {
  readonly id: number;
  offerName: string;
  description: string;
  offerImage: string;
  storeId: number;
  productId: number;
  status: string;
  stateSize: number;
  startDate: string;
  endDate: string;
  store: Family;
  product: Product;
};
export type TopProduct = {
  id: number;
  name: string;
  storeName: string;
  price: string;
  totalOrders: number;
  rating: string;
};

export type Backup = {
  id: number;
  backupName: string;
  createdAt: string;
};
