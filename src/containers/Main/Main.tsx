import React, { Fragment, useEffect, useMemo, useReducer } from "react";
import { connect, ConnectedProps } from "react-redux";
import Pagination from "rc-pagination";

import TableCoins from "../../components/TableCoins/TableCoins";

// Redux store actions
import { getCoinsAction } from "../../redux/actions/coinsAction";
import { CoinType, ThemeType } from "../../types/types";
// Actions for component's state
import { 
  setCurrencyAction, 
  setPageAction, 
  setLoadingAction, 
  setSortAction, 
  SortType 
} from "./actions";
import { reducer, initialState } from "./reducer";

type StateType = {
  coins: {
    list: Array<CoinType>;
    errorMessage: string;
  };
  theme: ThemeType;
};
type PropsFromReduxType = ConnectedProps<typeof connector>;

const mapStateToProps = (state: StateType) => ({
  coins: state.coins.list,
  errorMessage: state.coins.errorMessage,
  theme: state.theme
});
const connector = connect(mapStateToProps, { getCoinsAction });

// Convert sort item to number
const itemToNumber = 
  (obj: CoinType, name: keyof CoinType, num: number): number => {
    return obj[name] ? Number(obj[name].slice(num).replace(/[,%]/g, '')) : 0
  }

const sortingCoins = (coins: Array<CoinType>, sort: SortType): Array<CoinType> => {
  let coinsList = [...coins];
  const up = sort.direction === "up" ? 1 : -1,
        down = sort.direction === "up" ? -1 : 1,
        sliceNum = sort.name === "price" ? 1 : 0;

  if(sort.name === "name") {
    return coinsList.sort((a, b) => a[sort.name] > b[sort.name] ? up : down)
  }

  return coinsList.sort((a, b) => {
    const prevItem = itemToNumber(a, sort.name, sliceNum),
          nextItem = itemToNumber(b, sort.name, sliceNum);

    return prevItem < nextItem ? up : down;
  })
} 

const Main: React.FC<PropsFromReduxType> = 
  ({coins, errorMessage, theme, getCoinsAction}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currency, currentPage, loading, sort } = state;

    const sortCoinsList = useMemo(() => sortingCoins(coins, sort), [coins, sort]);

    useEffect(() => {
      dispatch(setLoadingAction(true));
      getCoinsAction(currency, currentPage);
    }, [currency, currentPage, getCoinsAction]);

    useEffect(() => {
      dispatch(setLoadingAction(false));
    }, [coins]);

    return (
      <Fragment>
        <TableCoins
          coins={sortCoinsList}
          errorMessage={errorMessage}
          currency={currency}
          loading={loading}
          setCurrency={curr => dispatch(setCurrencyAction(curr))}
          setSort={sort => dispatch(setSortAction(sort))}
          theme={theme}
        />
        {coins.length ? 
          <Pagination
            className={`pagination_${theme}`}
            onChange={page => dispatch(setPageAction(page))}
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
