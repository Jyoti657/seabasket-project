export interface TotalProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const calculateTotalAmount = (subtotal: number): TotalProps => {
  const shipping = subtotal > 0 ? 40 : 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  return { subtotal, shipping, tax, total };
};
