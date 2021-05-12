import { ProductDetails } from './ProductDetails'; 

const products = [
  {
    id: 1,
    name: "denim jacket",
    price: "Rs. 5000",
  },
  {
    id: 2,
    name: "sunglasses",
    price: "Rs. 2000",
  },
  {
    id: 3,
    name: "black jacket",
    price: "Rs. 4000",
  },
  {
    id: 4,
    name: "air buds",
    price: "Rs. 7000",
  }
];

export function Products({setRoute}) {
  return (
    <div className="card-container">
    {
      products.map((item) => (
        <ProductDetails item={item} id={item.id} setRoute={setRoute}/>
      ))
    }
  </div>
  )
}