import { useData } from "./context/data-context";

export function Header({ setRoute }) {
  const {
    state: { cart, wishlist },
  } = useData();

  return (
    <nav>
      <div className="logo">
        <button className="btn" onClick={() => setRoute("products")}>
          PIKACHU
        </button>
      </div>

      <div className="nav-icons">
        <button className="btn-primary-icon" onClick={() => setRoute("cart")}>
          <div className="badge-icon">
            {cart.length ? (
              <>
                <span className="material-icons-outlined md-36">
                  shopping_cart
                </span>
                <span className="badge-icon-value">{cart.length}</span>
              </>
            ) : (
              <span className="material-icons-outlined md-36">
                shopping_cart
              </span>
            )}
          </div>
        </button>
        <button
          className="btn-primary-icon"
          onClick={() => setRoute("wishlist")}
        >
          <div className="badge-icon">
            {wishlist.length ? (
              <>
                <span className="material-icons-outlined md-36">
                  bookmark_border
                </span>
                <span className="badge-icon-value"> {wishlist.length}</span>
              </>
            ) : (
              <span className="material-icons-outlined md-36">
                bookmark_border
              </span>
            )}
          </div>
        </button>
      </div>
    </nav>
  );
}
