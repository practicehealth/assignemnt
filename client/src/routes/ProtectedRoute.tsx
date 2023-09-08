import React, { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<AuthProviderProps> = ({ children }) => {
  const { state } = useContext(AuthContext);
  console.log(state);

  if (state.status === "loading") {
    return <>Loading ...</>;
  }

  if (state.status === "authenticated") {
    return <>{children}</>;
  }

  return <Navigate to={"/"} />;
};

export default ProtectedRoute;
