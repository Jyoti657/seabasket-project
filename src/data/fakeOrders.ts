import {order} from "../types"
import electronic from "../assets/electronic.png"
import  kitchen from "../assets/kitchen.png"
import women from "../assets/kitchen.png"
import men from "../assets/men.jpg"
import jeweelly  from "../assets/jewelly.jpg"
const fakeOrders:order[] = [
  {
    id: 1,
    productName: "Wireless Headphones",
    image: electronic,
    price: 59.99,
    status: "Shipped",
  },
  {
    id: 2,
    productName: "Smart Watch",
    image: kitchen,
    price: 129.99,
    status: "Shipped",
  },
  {
    id: 3,
    productName: "Bluetooth Speaker",
    image: electronic,
    price: 39.99,
    status: "Processing",
  },
  {
    id: 4,
    productName: "Gaming Mouse",
    image: women,
    price: 29.99,
    status: "Cancelled",
  },
  {
    id: 5,
    productName: "Laptop Stand",
    image: electronic,
    price: 24.99,
    status: "Delivered",
  },
  {
    id: 6,
    productName: "USB-C Hub",
    image: men,
    price: 19.99,
    status: "Returned",
  },
  {
    id: 7,
    productName: "4K Monitor",
    image: jeweelly,
    price: 299.99,
    status:"Returned",
  },
  {
    id: 8,
    productName: "Mechanical Keyboard",
    image: electronic,
    price: 89.99,
    status: "Processing",
  },
  {
    id: 9,
    productName: "Portable SSD",
    image: electronic,
    price: 99.99,
    status: "Shipped",
  },
  {
    id: 10,
    productName: "Wireless Charger",
    image: women,
    price: 15.99,
    status: "Delivered",
  },
];
export default fakeOrders
 