import {
  UseFormRegister,
  Path,
  FieldValue,
  FieldValues,
} from "react-hook-form";

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
  productData: ProductProps[]; // Array of ProductProps
  favoritData: ProductProps[]; // Array of ProductProps
  allProducts: ProductProps[]; // Array of ProductProps
  slice: any; // You can specify the type of the slice if you know it
}

export interface Product {
  product: ProductProps; // Wrapper interface if needed for passing as a prop
}
export interface Category {
  name: string;
  image: string;
}
export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export interface ProductState {
  allProducts: StoreProduct[];
  filteredProducts: StoreProduct[];
  filters: {
    minPrice: number;
    maxPrice: number;
    rating: number;
    discount: number;
  };
  sortBy: string;
  loading: boolean;
  error: string | null;
}

export interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  validation?: object;
  error?: string;
}
 export interface confirmModalProps{
  isOpne:boolean;
  onClose?:()=> void;
  OnConfrim?:()=>void;
  message:string;
  ConfirmText?:string;
  CanelText?:string;

 }