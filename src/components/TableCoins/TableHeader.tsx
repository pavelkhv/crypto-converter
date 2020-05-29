import React from "react";

const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="table-coins__row">
        <th className="table-coins__column">Pair</th>
        <th className="table-coins__column">Price</th>
        <th className="table-coins__column">Chg.24H%</th>
        <th className="table-coins__column">Open 24H</th>
        <th className="table-coins__column">High 24H</th>
        <th className="table-coins__column">Low 24H</th>
        <th className="table-coins__column">Chg.24H</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
