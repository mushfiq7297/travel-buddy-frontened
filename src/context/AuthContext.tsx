"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type AuthUser = {
  _id: string;
  email: string;
  role: string;
  name?: string | null;
} | null;

type AuthContextType = {
  user: AuthUser;
  loading: boolean;
  setUser: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
          credentials: "include",
        });

        const json = await res.json();

        if (json?.data?._id) {
          setUser({
            _id: json.data?._id,
            email: json.data?.email,
            role: json.data?.role,
            name: json.data?.name,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
