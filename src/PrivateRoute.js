import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export function PrivateRoute({ path, ...props }) {
  const { isUserLoggedIn } = useAuth();

  console.log("from private route", isUserLoggedIn)
  

  return (
    <>
      {isUserLoggedIn ? (
        <Route {...props} path={path} />
      ) : (
        <Navigate replace to="/login" state={{ from: path }} />
      )}
    </>
  );
}
