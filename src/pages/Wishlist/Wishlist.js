import { useData } from "../../context/DataContext";
import { WishlistCard } from "../../components/WishlistCard/WishlistCard";
import "./Wishlist.css";

export function Wishlist() {
  const {
    state: { wishlist },
  } = useData();

  console.log({ wishlist })

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-page-heading">Wishlist</h2>
      <div className="card-container card-container-wishlist">
        {wishlist.map((product) => (
          <WishlistCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
