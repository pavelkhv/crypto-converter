import React from "react";

import "./errorMessage.scss";

type Props = {
  message: string;
}

const ErrorMessage: React.FC<Props> = 
  ({ message }) => <div className="errorMessage">{message}</div>;

export default ErrorMessage;
