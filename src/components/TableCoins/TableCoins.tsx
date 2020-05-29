import React from "react";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

import { CoinType } from "../../types/types";

import "./index.scss";

type Props = {
  coins: Array<CoinType>;
  currency: string;
  setCurrency: (value: string) => void;
};

const currencies: Array<string> = ["USD", "EUR", "BTC", "USDT", "ETH", "GBP", "JPY", "KRW"];

const TableCoins: React.FC<Props> = ({coins, currency, setCurrency}: Props) => {
  return (
    <div className="content-wrapper">
      <ul className="currency-list">
        {currencies.map((curr: string) => (
          <li
            onClick={() => setCurrency(curr)}
            className={currency === curr
              ? "currency-list__item_active"
              : "currency-list__item"
            }
          >
            {curr}
          </li>
        ))}
      </ul>

      <div className="table-wrapper">
        <table className="table-coins">
          <TableHeader />
          <tbody>
            {coins.map((coin: CoinType) => (
              <TableRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCoins;
