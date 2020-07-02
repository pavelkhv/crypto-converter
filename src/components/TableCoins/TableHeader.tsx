import React from "react";

import { CoinType } from "../../types/types";

import SortTH from "./SortTH";

type PropsType = {
  setSort: (sort: keyof CoinType) => void;
};

const TableHeader: React.FC<PropsType> = ({ setSort }) => {
  return (
    <thead>
      <tr className="table-coins__row">
        <SortTH label="Pair" sortName="name" setSort={setSort} />
        <SortTH label="Price" sortName="price" setSort={setSort} />
        <SortTH label="Chg.24H%" sortName="change24Hour" setSort={setSort} />
        <th className="table-coins__column">Open 24H</th>
        <th className="table-coins__column">High 24H</th>
        <th className="table-coins__column">Low 24H</th>
        <th className="table-coins__column">Chg.24H</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
