import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export function Header({ setRoute }) {
  const {
    state: { cart, wishlist },
  } = useData();

  return (
    <nav>
      <div className="logo">
        <Link to="/" className="link">
          <button className="btn">
            PIKACHU
          </button>
        </Link>
      </div>

      <div className="nav-icons">
        <Link to="/cart" className="link">
          <button className="btn-primary-icon">
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
        </Link>

        <Link to="/wishlist" className="link">
          <button
            className="btn-primary-icon">
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
        </Link>
      </div>
    </nav>
  );
}
