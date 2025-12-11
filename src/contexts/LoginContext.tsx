import axios from "axios";
import { createContext, useState } from "react";

export type LoginContextType = {
  isLoggedIn: boolean;
  token: string;
  login: (courriel: string, motDePasse: string) => Promise<boolean>;
  logout: () => void;
};

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  token: "",
  login: () => new Promise<boolean>(() => false),
  logout: () => {},
});

export default function LoginProvider(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  async function login(courriel: string, motDePasse: string) {
    return axios
      .post('https://vinylesapi-bke0b0evdcdqdwb2.canadacentral-01.azurewebsites.net/api/generatetoken', {
        utilisateurLogin: {
          courriel,
          motDePasse,
        }
      })
      .then((response) => {
        const { token } = response.data;
        console.log(response.data);
        if (token) {
          setIsLoggedIn(true);
          setToken(token);
          return true;
        } else {
          setIsLoggedIn(false);
          setToken("");
          return false;
        }
      })
      .catch((error) => {
        console.error(
          "Erreur de connexion:",
          error.response?.data || error.message
        );
        setIsLoggedIn(false);
        setToken("");
        throw error;
      });
  }

  function logout() {
    setToken("");
    setIsLoggedIn(false);
  }

  const values = { isLoggedIn, token, login, logout };

  return (
    <LoginContext.Provider value={values}>
      {props.children}
    </LoginContext.Provider>
  );
}
