import React from "react";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import Preloader from "../Preloader/Preloader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { CoinType } from "../../types/types";

import "./index.scss";

type Props = {
  coins: Array<CoinType>;
  errorMessage: string;
  currency: string;
  loading: boolean;
  setCurrency: (value: string) => void;
};

const currencies: Array<string> = ["USD", "EUR", "BTC", "USDT", "ETH", "GBP", "JPY", "KRW"];

const TableCoins: React.FC<Props> = 
  ({coins, errorMessage, currency, loading, setCurrency}: Props) => (
    <div className="content-wrapper">
      <ul className="currency-list">
        {currencies.map((curr: string) => (
          <li
            key={curr}
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

        {
          errorMessage ? <ErrorMessage message={errorMessage} /> : 
          loading || !coins.length ? <Preloader /> : ""
        }
      </div>
    </div>
  );

export default TableCoins;
