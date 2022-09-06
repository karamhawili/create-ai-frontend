import React, { useContext, useState } from "react";

const FilesTypeContext = React.createContext();

export const useFilesTypeContext = () => useContext(FilesTypeContext);

export const FilesTypeProvider = ({ children }) => {
  const [filesType, setFilesType] = useState("projectFiles"); // or draftFiles

  const setType = (value) => setFilesType(value);

  const value = {
    filesType,
    setType,
  };

  return (
    <FilesTypeContext.Provider value={value}>
      {children}
    </FilesTypeContext.Provider>
  );
};
