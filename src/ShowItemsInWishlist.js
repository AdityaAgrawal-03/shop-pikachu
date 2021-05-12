import { useData } from "./context/data-context";

export function ShowItemsInWishlist({ item }) {

  const { dispatch } = useData();
  

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
          <button className="btn btn-secondary" onClick={() => dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item})}>
            Remove from Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
