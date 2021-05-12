import { ProductDetails } from './ProductDetails'; 
import { products, useData } from './context/data-context'


export function Products({setRoute}) {
  const { state } = useData();

  console.log({state})
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