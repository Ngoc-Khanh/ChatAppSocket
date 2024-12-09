import { AuthApi } from "@/api/auth.api";
import { IUser } from "@/data/types/auth.types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface StateUserType {
  user: IUser | null;
  token: string;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setToken: (token: string) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const StateUser = createContext<StateUserType>({
  user: null,
  token: "",
  setUser: () => {},
  setToken: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem("ACCESS_TOKEN") || ""
  );

  const updateToken = (newToken: string) => {
    setToken(newToken);
    if (newToken) localStorage.setItem("ACCESS_TOKEN", newToken);
    else localStorage.removeItem("ACCESS_TOKEN");
  };

  useEffect(() => {
    if (token) {
      AuthApi.getProfile()
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setUser(null);
          updateToken("");
        });
    }
  }, [token]);

  return (
    <StateUser.Provider value={{ user, token, setUser, setToken: updateToken }}>
      {children}
    </StateUser.Provider>
  );
};

export const useStateUser = () => useContext(StateUser);
