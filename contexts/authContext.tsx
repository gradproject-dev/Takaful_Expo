import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";
import { Auth } from "@/app/Auth/types";

const AuthContext = createContext<{
  signIn: (token: Auth) => void;
  signOut: () => void;
  jwt?: string | null;
  isLoading: boolean;
} | null>(null);

// This hook gives you access to the raw JWT string from storage.
export function useJWT() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useJWT must be wrapped in a <JWTProvider />");
    }
  }
  return value!;
}

// This hook gives you access to the parsed Auth object
export function useAuth(): {
  auth: Auth | null;
  isLoading: boolean;
  signIn: (token: Auth) => void;
  signOut: () => void;
} {
  const { jwt, signIn, signOut, isLoading } = useJWT();

  let auth: Auth | null = null;
  try {
    auth = jwt ? JSON.parse(jwt) : null;
  } catch (err) {
    console.error("Error parsing jwt:", err);
  }

  return { auth, isLoading, signIn, signOut };
}

export function JWTProvider({ children }: PropsWithChildren) {
  const [[isLoading, jwt], setJWT] = useStorageState("jwt");

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: Auth) => {
          setJWT(JSON.stringify(token));
          console.log(token);
        },
        signOut: () => {
          setJWT(null);
        },
        jwt,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
