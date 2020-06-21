import React from "react";
import { ThemeType } from "../../types/types";

import "./preloader.scss";

type PropsType = { theme: ThemeType }

const Preloader: React.FC<PropsType> = ({theme}) => (
  <div className={`preloader preloader_${theme}`}></div>
);

export default Preloader;
