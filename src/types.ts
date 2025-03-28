export interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
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
  rating?: {
    rate: number;
    count: number;
  };
}
export interface stateProps {
  productData: [];
  favoritData: [];
  allProducts: [];
  slice: any;
  userInfo: null | string;
}
 export interface Product{
  product:ProductProps 
 }
