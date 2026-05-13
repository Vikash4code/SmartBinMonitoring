import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);


  // LOGIN
  const login = (userData, token) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem("token", token);

    setUser(userData);
  };


  // LOGOUT
const logout = () => {

  localStorage.removeItem("user");

  localStorage.removeItem("token");

  window.location.href = "/login";
};


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;