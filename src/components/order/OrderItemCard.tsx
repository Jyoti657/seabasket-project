import React from "react";
import { currencyFormatter } from "../../util/formatting";
import { OrderItem } from "../../types";

interface OrderItemCardProps {
  item: OrderItem;
  onClick?: () => void;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer border-b last:border-none py-3"
    >
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-full sm:w-24 h-24 object-cover rounded-lg border"
      />
      <div className="flex-1">
        <p className="text-lg font-semibold text-black truncate">
          {item.product.name}
        </p>
        <p className="text-sm text-slate-700">
          {currencyFormatter.format(item.product.price)}
        </p>
        <p>Qty: {item.quantity}</p>
        <p className="text-sm text-slate-700">
          Discount: {item.product.discount}%
        </p>
        <p className="text-sm text-slate-700 line-clamp-2">
          {item.product.description}
        </p>
      </div>
    </div>
  );
};

export default OrderItemCard;
