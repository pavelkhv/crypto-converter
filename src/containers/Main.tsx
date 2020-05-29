import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import TableCoins from "../components/TableCoins/TableCoins";

import { getCoinsAction } from "../redux/actions/index";
import { CoinType } from "../types/types";

type StateType = { coins: Array<CoinType> };
type PropsFromReduxType = ConnectedProps<typeof connector>;

const mapStateToProps = (state: StateType) => ({ coins: state.coins });
const connector = connect(mapStateToProps, { getCoinsAction });

const Main: React.FC<PropsFromReduxType> = (props: PropsFromReduxType) => {
  const [currency, setCurrency] = useState<string>("USD");

  useEffect(() => {
    props.getCoinsAction(currency);
  }, [currency]);

  return (
    <TableCoins
      coins={props.coins}
      currency={currency}
      setCurrency={setCurrency}
    />
  );
};

export default connector(Main);
