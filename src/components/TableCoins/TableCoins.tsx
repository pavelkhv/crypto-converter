import React from "react";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TableCurrencies from "./TableCurrencies";
import Preloader from "../Preloader/Preloader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { CoinType, ThemeType } from "../../types/types";

import "./index.scss";

type Props = {
  coins: Array<CoinType>;
  errorMessage: string;
  theme: ThemeType;
  currency: string;
  loading: boolean;
  setCurrency: (value: string) => void;
  setSort: (sort: keyof CoinType) => void;
};

const TableCoins: React.FC<Props> = 
  ({coins, errorMessage, theme, currency, loading, setCurrency, setSort}) => (
    <div className="content-wrapper">
      <TableCurrencies currency={currency} theme={theme} setCurrency={setCurrency}/> 

      <div className={`table-wrapper table-wrapper_${theme}`}>
        <table className={`table-coins table-coins_${theme}`}>
          <TableHeader setSort={setSort} />
          <tbody>
            {coins.map((coin: CoinType) => (
              <TableRow key={coin.id} coin={coin} theme={theme} />
            ))}
          </tbody>
        </table>

        {
          errorMessage ? <ErrorMessage message={errorMessage} /> : 
          loading || !coins.length ? <Preloader theme={theme} /> : ""
        }
      </div>
    </div>
  );

export default TableCoins;
