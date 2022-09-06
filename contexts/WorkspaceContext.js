import React, { useContext, useState } from "react";

const WorkspaceContext = React.createContext();

export const useWorkspaceContext = () => useContext(WorkspaceContext);

export const WorkspaceProvider = ({ children }) => {
  const [currentOutput, setCurrentOutput] = useState({
    image: "",
    vector: "",
  });

  const [currentTargets, setCurrentTargets] = useState([]);

  const setOutput = (value) => setCurrentOutput(value);

  const setTargets = (value) => {
    setCurrentTargets(value);
    console.log("Targets in Workspace contet were changed to", value);
  };

  const value = {
    currentOutput,
    setOutput,
    currentTargets,
    setTargets,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};
