export interface ProductProps {
  quantity: number;
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  discount?: number;
  rating?: number;
  wishlistItemId?: string;
}

export interface StateProps {
  productData: ProductProps[];
  favoritData: ProductProps[];
  allProducts: ProductProps[];
}

export interface Product {
  product: ProductProps;
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  className: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface ProductState {
  allProducts: ProductProps[];
  productsDetails: null | any;
  productSearch: null;
  productCategories: [];
  productCategoriesList: [];
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
  userId: string | null;
  user: {
    firstName?: string;
    lastName?: string;
    mobile?: string;
    address: {
      id: string;
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      postalCode?: string;
      state?: string;
    };
  } | null;
  isAuthenticated: boolean;
  otpVerified: boolean;
  verifiedUser: boolean;
  token: null | string;
  authError: null | string;
  isLoading: boolean;
  registerUser: boolean;
  reset: string | null;
}

export interface addressForm {
  id: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  state: string;
  city: string;
  country: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    discount: number;
    userId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface order {
  id: number;
  price: number;
  date: string;
  status: string;
  image: string;
  productName: string;
  orderItems: OrderItem[];
}
