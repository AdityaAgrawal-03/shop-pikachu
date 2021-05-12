import { useWishlist } from './context/wishlist-context';
import { ShowItemsInWishlist } from "./ShowItemsInWishlist";


export function Wishlist() {

  const { itemsInWishlist } = useWishlist();

  console.log({itemsInWishlist})

  return (
    <>
      <h1>Items in wishlist: {itemsInWishlist.length}</h1>
      {itemsInWishlist.map((item) => (
        <ShowItemsInWishlist item={item} id={item.id} />
      ))}
    </>
  );
}
