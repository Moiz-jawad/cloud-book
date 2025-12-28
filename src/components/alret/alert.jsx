import React, { useEffect, useState } from "react";
import "./alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const alertConfig = {
  primary: { icon: faInfoCircle, label: "Info" },
  success: { icon: faCheckCircle, label: "Success" },
  warning: { icon: faExclamationTriangle, label: "Warning" },
  danger: { icon: faExclamationTriangle, label: "Danger" },
};

const Alert = ({ type = "primary", message, duration = 3000 }) => {
  const { icon, label } = alertConfig[type] || alertConfig.primary;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      className={`alert alert-${type} alert-animated d-flex align-items-center my-3 ${
        visible ? "show" : "hide"
      }`}
      role="alert"
    >
      <div className="d-flex align-items-center w-100">
        <FontAwesomeIcon
          icon={icon}
          className="me-2"
          aria-label={`${label}:`}
        />
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Alert;
