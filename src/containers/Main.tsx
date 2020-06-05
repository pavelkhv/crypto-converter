import React, { Fragment, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import Pagination from "rc-pagination";

import TableCoins from "../components/TableCoins/TableCoins";

import { getCoinsAction } from "../redux/actions/index";
import { CoinType } from "../types/types";

type StateType = {
  coins: {
    list: Array<CoinType>;
    errorMessage: string;
  };
};
type PropsFromReduxType = ConnectedProps<typeof connector>;

const mapStateToProps = (state: StateType) => ({
  coins: state.coins.list,
  errorMessage: state.coins.errorMessage,
});
const connector = connect(mapStateToProps, { getCoinsAction });

const Main: React.FC<PropsFromReduxType> = ({
  coins,
  errorMessage,
  getCoinsAction,
}: PropsFromReduxType) => {
  const [currency, setCurrency] = useState<string>("USD");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getCoinsAction(currency, currentPage);
  }, [currency, currentPage, getCoinsAction]);

  useEffect(() => {
    setLoading(false);
  }, [coins]);

  return (
    <Fragment>
      <TableCoins
        coins={coins}
        errorMessage={errorMessage}
        currency={currency}
        loading={loading}
        setCurrency={setCurrency}
      />
      {coins.length ? 
        <Pagination
          onChange={setCurrentPage}
          current={currentPage}
          pageSize={20}
          total={200}
          showTitle={false}
        />
       : ""}
    </Fragment>
  );
};

export default connector(Main);
