export interface ProductProps {
  id: number;
  title: string;
  price: number ;
  category: string;
  quantity: number;
  description: string;
  images: string[];
  brand: string;
  discount?: number;
  rating?: number
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
  type?: "button" | "submit" | "reset";
}

export interface ProductState {
  allProducts: ProductProps[];
  productsDetails: null | any;
  productSearch: null;
  productCategories: { name: string; images: any }[];
  productCategoriesList: [];
  getProductCategoriesList: ProductProps[];
  filteredProducts: ProductProps[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export interface confirmModalProps {
  isOpen: boolean;
  onClose?: () => void;
  OnConfirm?: () => void;
  message: string;
  ConfirmText?: string;
  CancelText?: string;
}

export interface Auth {
  user: {
    firstName?: string;
    lastName?: string;
    mobile?: string;
    address:{
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      postalCode?: string;
      state?: string;
    }
    

  } | null;
  isAuthenticated: boolean;
  otpVerified: boolean;
  verifiedUser: boolean;
  token: null|string;
  authError: null | string;
  isLoading: boolean;
  registerUser:boolean
  
}

export interface addressForm {
  AdressLine1:string;
  AdressLine2:string;
  PostalCode:number;
  state:string;
  city:string;
  country:string

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
