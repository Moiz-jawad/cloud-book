import React, { useCallback, useState } from "react";
import AlertContext from "./alertContext";
import Alert from "../components/alret/alert";

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((type, message, duration = 3000) => {
    setAlert({ type, message, duration, id: Date.now() });
  }, []);

  const clearAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {/* Global alert overlay pinned to top center so layout doesn't jump */}
      <div
        className="position-fixed top-0 start-50 translate-middle-x pt-3"
        style={{
          zIndex: 2000,
          maxWidth: "960px",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        {alert && (
          <div style={{ pointerEvents: "auto" }}>
            <Alert
              key={alert.id}
              type={alert.type}
              message={alert.message}
              duration={alert.duration}
            />
          </div>
        )}
      </div>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
