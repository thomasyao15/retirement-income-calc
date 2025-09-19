"use client";

import React, { createContext, useContext, useState } from "react";

interface ValidationContextType {
  canProceed: boolean;
  setCanProceed: (value: boolean) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

const ValidationContext = createContext<ValidationContextType>({
  canProceed: true,
  setCanProceed: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
});

export const useValidation = () => useContext(ValidationContext);

export function ValidationProvider({ children }: { children: React.ReactNode }) {
  const [canProceed, setCanProceed] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <ValidationContext.Provider value={{ canProceed, setCanProceed, errorMessage, setErrorMessage }}>
      {children}
    </ValidationContext.Provider>
  );
}