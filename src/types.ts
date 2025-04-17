export interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  quantity: number;
  description: string;
  image: string;
  discount?: number;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface StoreProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
  discount?: number;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface StateProps {
  productData: ProductProps[];
  favoritData: ProductProps[];
  allProducts: ProductProps[];
}

export interface Product {
  product: ProductProps;
}
export interface Category {
  name: string;
  image: string;
}
export interface ButtonProps {
  label: string;
  onClick?: () => void;
  className: string;
}

export interface ProductState {
  allProducts: StoreProduct[];
  productsDetails:null|any;
  filteredProducts: StoreProduct[];
  filters: {
    minPrice: number;
    maxPrice: number;
    rating: number;
    discount: number;
  };
  sortBy: string;
  searchQuery: String;
  loading: boolean;
  error: string | null;
}

export interface confirmModalProps {
  isOpne: boolean;
  onClose?: () => void;
  OnConfrim?: () => void;
  message: string;
  ConfirmText?: string;
  CancelText?: string;
}

export interface Auth {
  user: {
    name?: string;
    email: string;
    password?: string;
    phone?: string;
  } | null;
  isAuthenticated: boolean;
  otpVerified: boolean;
  token: null | string;
  authError: null | string;
  isLoading: boolean;
  registerUser: null;
}

export interface addressForm {
  id: string;
  fullname: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface order {
  id: number;
  date: string;
  productName: string;
  image: string;
  price: number;
  status:
    | "Delivered"
    | "Shipped"
    | "Processing"
    | "Cancelled"
    | "Returned"
    | "orderConfirmed"
    | "out for Delivery";
}
