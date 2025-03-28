interface Category {
    id: number;
    name: string;
    image: string;
  }
  
  const categories: Category[] = [
    { id: 1, name: "Electronics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl-g8Wh6XyXqoPb710U7j2vcyH-2RdtKgOeQ&s" },
    { id: 2, name: "Fashion", image: "https://assets.vogue.com/photos/614a2441026b46054594809f/16:9/w_1280,c_limit/00_social.jpg" },
    { id: 3, name: "Home & Kitchen", image: "https://c8.alamy.com/comp/2C6KDAH/home-appliances-e-commerce-or-online-shopping-concept-3d-render-sale-background-2C6KDAH.jpg" },
    { id: 4, name: "Sports & Outdoors", image: "https://media.istockphoto.com/id/949190736/photo/various-sport-equipments-on-grass.jpg?s=612x612&w=0&k=20&c=e5XgszJQciKRrqQECO9RPqLh7w1kkhNBFetf4742BF0=" },
    { id: 5, name: "Toys & Games", image: "https://t4.ftcdn.net/jpg/03/24/42/21/360_F_324422176_Lgn7NTeFyNaUKIDu0Ppls1u8zb8wsKS4.jpg" },
    { id: 6, name: "Books & Stationery", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktoNpsu4s9DMHTtXkuuItwSp2ArmLW4YjdA&s" },
    { id: 7, name: "Health & Beauty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SkbBZhP2YF1kFCDd9RblSNEUFVy4RG8dzg&s" },
    { id: 8, name: "Automobile", image: "" },
    { id: 9, name: "Groceries", image: "/images/categories/groceries.jpg" },
    { id: 10, name: "Furniture", image: "/images/categories/furniture.jpg" },
  ];
const CategoryList:React.FC=()=>{
    return (
        <>
        <h1>ALl  category of the products</h1>
        <div>
            <div>
            <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Browse Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category: Category) => (
            <div
              key={category.id}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
            </div>
            
        </div>
        </>
    )
}
 export default CategoryList