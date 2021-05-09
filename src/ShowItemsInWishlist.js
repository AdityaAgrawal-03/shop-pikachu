import { useWishlist } from "./context/wishlist-context";

export function ShowItemsInWishlist({ item }) {

  const { itemsInWishlist, setItemsInWishlist } = useWishlist();
  console.log({itemsInWishlist})

  return (
    <div className="card-container">
      <div className="card card-shadow card-badge">
        <span className="badge badge-best-value">Best Value</span>
        <div className="card-header">
          <img src="./assests/bicycle-images/bicycle-1.jpg" alt="bicycle-1" className="card-image" />
        </div>
        <div className="card-content">
          <div className="card-title">
            <h3>{item.name}</h3>
          </div>
          <div className="card-price">{item.price}</div>
          <button className="btn btn-secondary" onClick={() =>
            setItemsInWishlist((wishlistItems) => wishlistItems.filter((currentWishlistItem) => currentWishlistItem !== item))
          }>
            Remove from Wishlist
          </button>
          <p>Count: {item.count}</p>
        </div>
      </div>
    </div>
  );
}
