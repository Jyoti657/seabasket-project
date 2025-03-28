export interface Category {
    id: number;
    name: string;
    image: string;
  }
  
  const categories: Category[] = [
    { id: 1, name: "Electronics", image: "/images/categories/electronics.jpg" },
    { id: 2, name: "Fashion", image: "/images/categories/fashion.jpg" },
    { id: 3, name: "Home & Kitchen", image: "/images/categories/home.jpg" },
    { id: 4, name: "Sports & Outdoors", image: "/images/categories/sports.jpg" },
    { id: 5, name: "Toys & Games", image: "/images/categories/toys.jpg" },
    { id: 6, name: "Books & Stationery", image: "/images/categories/books.jpg" },
    { id: 7, name: "Health & Beauty", image: "/images/categories/beauty.jpg" },
    { id: 8, name: "Automobile", image: "/images/categories/automobile.jpg" },
    { id: 9, name: "Groceries", image: "/images/categories/groceries.jpg" },
    { id: 10, name: "Furniture", image: "/images/categories/furniture.jpg" },
  ];
  
  export default categories;
  