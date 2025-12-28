import { createContext } from "react";

const AlertContext = createContext({
  alert: null,
  showAlert: () => {},
  clearAlert: () => {},
});

export default AlertContext;
