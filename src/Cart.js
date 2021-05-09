import { useCart } from './context/cart-context';
import { ShowItemsInCart } from "./ShowItemsInCart";


export function Cart() {

  const { itemsInCart } = useCart();

  console.log({ itemsInCart });

  return (
    <>
      <h1>Items in cart: {itemsInCart.length} </h1>
      {itemsInCart.map((item) => (
        <ShowItemsInCart item={item} id={item.id} />
      ))}
    </>
  );
}
