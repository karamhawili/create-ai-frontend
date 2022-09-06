import React, { useContext, useState } from "react";

const LoginContext = React.createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  // console.log('rendering Login Provider')

  const [isLogin, setIsLogin] = useState(false);

  // console.log('isLogin in login provider', isLogin)

  const setLogin = (value) => setIsLogin(value);

  const value = {
    isLogin,
    setLogin,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
