// components/order/OrderCard.tsx
import React from "react";
import { order } from "../../types";
import OrderItemCard from "./OrderItemCard";

interface OrderCardProps {
  order: order;
  onOrderClick: (id: number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onOrderClick }) => {
  return (
    <div className="p-4 sm:p-5 border rounded-xl bg-soft_mint shadow-sm hover:shadow-md transition">
      {order.orderItems && order.orderItems.length > 0 ? (
        order.orderItems.map((item: any) => (
          <OrderItemCard
            key={item.id}
            item={item}
            onClick={() => onOrderClick(order.id)}
          />
        ))
      ) : (
        <p className="text-sm text-gray-500 italic">
          No products in this order.
        </p>
      )}
    </div>
  );
};

export default OrderCard;
