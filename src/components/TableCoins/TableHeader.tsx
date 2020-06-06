import React from "react";

import { CoinType } from "../../types/types";

type Props = {
  setSort: (sort: keyof CoinType) => void;
};

const TableHeader: React.FC<Props> = ({ setSort }: Props) => {
  return (
    <thead>
      <tr className="table-coins__row">
        <th className="table-coins__column">
          <span 
            className="table-coins__sort"
            onClick={() => setSort("name")}
          >
            Pair
          </span>
        </th>
        <th className="table-coins__column">
          <span 
            className="table-coins__sort"
            onClick={() => setSort("price")}
          >
            Price
          </span> 
        </th>
        <th className="table-coins__column">
          <span 
            className="table-coins__sort"
            onClick={() => setSort("change24Hour")}
          >
            Chg.24H%
          </span> 
        </th>
        <th className="table-coins__column">Open 24H</th>
        <th className="table-coins__column">High 24H</th>
        <th className="table-coins__column">Low 24H</th>
        <th className="table-coins__column">Chg.24H</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
