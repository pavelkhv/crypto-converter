import React from "react";

import { CoinType } from "../../types/types";

type Props = { coin: CoinType };

const TableRow: React.FC<Props> = (props) => {
  const {
    name,
    fullName,
    iconUrl,
    price,
    high24,
    low24,
    open24,
    change24,
    change24Hour,
  } = props.coin;

  const iconSrc = `https://www.cryptocompare.com/${iconUrl}`;
  const colorPercent =
    Number(change24Hour) > 0 ? "green" : 
    Number(change24Hour) < 0 ? "red" : "white";

  return (
    <tr className="table-coins__row">
      <td className="table-coins__column">
        <img className="table-coins__icon" src={iconSrc} alt="coin-icon" />
        <div className="table-coins__names">
          <span>{name}</span>
          <span className="table-coins__fullName">{fullName}</span>
        </div>
      </td>

      <td className="table-coins__column">{price}</td>

      <td className="table-coins__column">
        <span className={`table-coins__percent_${colorPercent}`}>
          {change24Hour}%
        </span>
      </td>

      <td className="table-coins__column">{open24}</td>
      <td className="table-coins__column">{high24}</td>
      <td className="table-coins__column">{low24}</td>
      <td className="table-coins__column">{change24}</td>
    </tr>
  );
};

export default TableRow;
