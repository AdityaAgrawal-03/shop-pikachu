import { useData } from './context/data-context';
import { ShowItemsInWishlist } from "./ShowItemsInWishlist";


export function Wishlist() {

  const { state: { wishlist } } = useData();

  return (
    <>
      <h1>Items in wishlist: {wishlist.length}</h1>
      {wishlist.map((item) => (
        <ShowItemsInWishlist item={item} id={item.id} />
      ))}
    </>
  );
}
