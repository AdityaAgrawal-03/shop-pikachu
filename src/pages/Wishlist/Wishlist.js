import { useData } from "../../context/DataContext";
import { WishlistCard } from "../../components/WishlistCard/WishlistCard";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

export function Wishlist() {
  const {
    state: { wishlist }, isLoading
  } = useData();
  const navigate = useNavigate();

  if(isLoading) {
    return(
      <div className="spinner">
        <div></div>
        <div></div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      {wishlist.length ? (
        <>
          <h2 className="wishlist-page-heading">Wishlist</h2>
          <div className="card-container card-container-wishlist">
            {wishlist.map((product) => (
              <WishlistCard product={product} key={product._id} />
            ))}
          </div>
        </>
      ) : (
        <div className="wishlist-empty">
          <h2> Wishlist is empty! </h2>
          <button
            className="btn btn-primary btn-large"
            onClick={() => navigate("/")}
          >
            Start Shopping!
          </button>
        </div>
      )}
    </div>
  );
}
