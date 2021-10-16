import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export function PrivateRoute({ path, ...props }) {
  const { token } = useAuth();

  return (
    <>
      {token ? (
        <Route {...props} path={path} />
      ) : (
        <Navigate replace to="/login" state={{ from: path }} />
      )}
    </>
  );
}
