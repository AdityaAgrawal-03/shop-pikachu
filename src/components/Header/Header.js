import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "./Header.css";

export function Header() {
  const {
    state: { cart, wishlist },
  } = useData();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [dialog, setDialog] = useState(false);

  const checkUserStatus = () => {
    user ? setDialog(true) : navigate("/login", { replace: true });
  };

  return (
    <div>
      {dialog && <ShowDialog dialog={dialog} setDialog={setDialog} />}
      <nav>
        <div className="logo">
          <Link to="/" className="link">
            <button className="btn btn-primary btn-logo">
              <strong>PIKACHU</strong>
            </button>
          </Link>
        </div>

        <div className="nav-icons">
          <Link to="/cart" className="link">
            <button className="btn-primary-icon">
              <div className="badge-icon">
                {cart?.length ? (
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
            <button className="btn-primary-icon">
              <div className="badge-icon">
                {wishlist?.length ? (
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

          <button
            className="btn btn-primary btn-loginStatus"
            onClick={checkUserStatus}
          >
            {user ? "LOGOUT" : "LOGIN"}
          </button>
        </div>
      </nav>
    </div>
  );
}

function ShowDialog({ dialog, setDialog }) {
  const navigate = useNavigate();
  const { dispatch } = useData();
  const { logout } = useAuth();

  return (
    <>
      <div className="dialog-content-container">
        <section className="dialog-content">
          <header className="dialog-header">
            <h3>LOGOUT</h3>
          </header>
          <div className="dialog-body">
            <p>Are you sure you want to log out?</p>
          </div>
          <footer className="dialog-footer">
            <button
              className="btn btn-default dialog-alert-noBtn"
              onClick={() => setDialog(false)}
            >
              No
            </button>
            <button
              className="btn btn-primary dialog-alert-yesBtn"
              onClick={() => {
                setDialog(false);
                logout();
                dispatch({ type: "RESET" });
                navigate("/", { replace: true });
              }}
            >
              Yes
            </button>
          </footer>
        </section>
      </div>
    </>
  );
}
