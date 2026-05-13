import { useContext } from "react";
import { AppAlertContext } from "./AppAlertContext";

export const useAppAlert = () => {
  const context = useContext(AppAlertContext);

  if (!context) {
    throw new Error("useAppAlert must be used inside AppAlertProvider");
  }

  return context;
};
