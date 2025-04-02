// import { ProductState } from "../types";

// export const  applyFilters=(state:ProductState)=>{
//     state.filteredProducts=state.allProducts.filter((product)=>{

//         return(
//             product.price>=state.filters.minPrice &&
//             product.price<=state.filters.maxPrice &&
//             (product.rating?.rate??0)>=state.filters.rating &&
//             (product.discount||0)>=state.filters.discount
//         )
//     })
// }
//  export const applySorting= (state:ProductState)=>{
//          const  ProductToSort=state.filteredProducts.length>0
//          ?[...state.filteredProducts]// this avoid mutation
//          :[...state.allProducts]

//     if(state.sortBy === "price-low-high"){
//         state.filteredProducts.sort((a,b)=>a.price -b.price);
//     }
//     else if(state.sortBy ==="price-high-low"){
//         state.filteredProducts.sort((a,b)=>b.price- a.price)
//     }
//     else if(state.sortBy === "name"){
//         state.filteredProducts.sort((a,b)=>a.title.localeCompare(b.title))
//     }
//     state.filteredProducts=ProductToSort;
//  }