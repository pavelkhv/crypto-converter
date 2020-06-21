import React from "react";
import { ThemeType } from "../../types/types";

const currencies: Array<string> = ["USD", "EUR", "BTC", "USDT", "ETH", "GBP", "JPY", "KRW"];

type PropsType = { 
  currency: string;
  theme: ThemeType;
  setCurrency: (value: string) => void;
};

const TableCurrencies: React.FC<PropsType> = ({currency, theme, setCurrency}) => {
  return (
    <ul className={`currency-list currency-list_${theme}`}>
      {currencies.map((curr: string) => (
        <li
          key={curr}
          onClick={() => setCurrency(curr)}
          className={`currency-list__item currency-list__item_${theme} 
            ${currency === curr ? 'currency-list__item_active' : ''}`}
        >
          {curr}
        </li>
      ))}
    </ul>
  )
};

export default TableCurrencies;
