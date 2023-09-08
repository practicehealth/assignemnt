import React, {
  ReactNode,
  createContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import { server } from "../api/fetch";

interface AuthProviderProps {
  children: ReactNode;
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "loading":
      return { ...state, userInfo: null, status: "loading" };
    case "login":
      return { ...state, userInfo: action.payload, status: "authenticated" };
    case "logout":
      return { ...state, userInfo: null, status: "unauthenticated" };
    default:
      return state;
  }
};

interface AuthType {
  state: any;
  dispatch: any;
}

const initialContext: AuthType = {
  state: undefined,
  dispatch: undefined,
};

export const AuthContext = createContext<AuthType>(initialContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    userInfo: null,
    status: "loading",
  });

  const handleAuth = useCallback(async () => {
    try {
      const { data } = await server.get("/auth/verify");
      if (!data.userInfo) {
        dispatch({ type: "logout" });
        return;
      }
      dispatch({ type: "login", payload: data.userInfo });
    } catch (error) {
      dispatch({ type: "logout" });
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
