import React from "react";

import "./errorMessage.scss";

type PropsType = {
  message: string;
}

const ErrorMessage: React.FC<PropsType> = 
  ({ message }) => <div className="errorMessage">{message}</div>;

export default ErrorMessage;
