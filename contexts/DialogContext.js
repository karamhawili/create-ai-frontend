import React, { useContext, useState } from "react";

const DialogContext = React.createContext();

export const useDialogContext = () => useContext(DialogContext);

export const DialogProvider = ({ children }) => {
  // console.log('rendering Login Provider')

  const [isOpen, setIsOpen] = useState(false);

  // console.log('isLogin in login provider', isLogin)

  const setOpen = (value) => setIsOpen(value);

  const value = {
    isOpen,
    setOpen,
  };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};
