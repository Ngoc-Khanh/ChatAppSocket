import { createContext, useContext, useState } from "react";

interface StateUserType {
  user: string;
  token: string;
  setUser: (user: string) => void;
  setToken: (token: string) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const StateUser = createContext<StateUserType>({
  user: "",
  token: "",
  setUser: () => {},
  setToken: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<string>("");
  const [token, setToken] = useState<string>(
    localStorage.getItem("ACCESS_TOKEN") || ""
  );

  const updateToken = (newToken: string) => {
    setToken(newToken);
    if (newToken) localStorage.setItem("ACCESS_TOKEN", newToken);
    else localStorage.removeItem("ACCESS_TOKEN");
  };

  return (
    <StateUser.Provider value={{ user, token, setUser, setToken: updateToken }}>
      {children}
    </StateUser.Provider>
  );
};

export const useStateUser = () => useContext(StateUser);
