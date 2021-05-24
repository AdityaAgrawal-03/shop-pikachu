import { useData } from "../../context/DataContext";
import { WishlistCard } from "../../components/WishlistCard/WishlistCard";
import "./Wishlist.css";

export function Wishlist() {
  const {
    state: { wishlist },
  } = useData();

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-page-heading">Wishlist</h2>
      <div className="card-container card-container-wishlist">
        {wishlist.map((item) => (
          <WishlistCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
