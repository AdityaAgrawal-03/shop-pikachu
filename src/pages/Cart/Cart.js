import { useData } from '../../context/data-context';
import { ShowItemsInCart } from "../../ShowItemsInCart";


export function Cart() {

  const { state: { cart } } = useData();

  console.log({cart})
  

  return (
    <>
      <h1>Items in cart: {cart.length} </h1>
      {cart.map((item) => (
        <ShowItemsInCart item={item} key={item.id} />
      ))}
    </>
  );
}
