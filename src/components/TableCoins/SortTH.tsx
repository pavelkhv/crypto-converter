import React from 'react'

import { CoinType } from "../../types/types";

type PropsType = {
  label: string;
  sortName: keyof CoinType;
  setSort: (name: keyof CoinType) => void;
}

const SortTH: React.FC<PropsType> = ({ label, sortName, setSort }) => {
  return (
    <th className="table-coins__column">
      <span 
        className="table-coins__sort"
        onClick={() => setSort(sortName)}
      >
        {label}
      </span>
    </th>
  )
}

export default SortTH
