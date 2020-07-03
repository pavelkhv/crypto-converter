import { ThunkAction } from "redux-thunk";
import { http } from "../../assets/ts/http";

import { GET_COINS, ERROR_COINS } from "../actionTypes";
import { CoinType } from "../../types/types";
import { AppStoreType } from "../reducers/rootReducer";

type GetCoinsActionType = {
  type: typeof GET_COINS;
  coins: Array<CoinType>;
};

type ErrorCoinsActionType = {
  type: typeof ERROR_COINS;
  errorMessage: string;
};

const getCoins = (coins: Array<CoinType>): GetCoinsActionType => ({
  type: GET_COINS,
  coins
});

const errorCoins = (): ErrorCoinsActionType => ({
  type: ERROR_COINS,
  errorMessage: "An error occurred while loading data. Try again later.",
});

export type ActionCoinsTypes = GetCoinsActionType | ErrorCoinsActionType;

export const getCoinsAction = 
  (currency: string, currentPage: number): ThunkAction<void, AppStoreType, unknown, ActionCoinsTypes> => {
    const url =`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20`;

    return async (dispatch) => {
      try {
        const coins = await http(`${url}&tsym=${currency}&page=${currentPage - 1}`);

        const coinData: Array<CoinType> = coins.Data.map((item: typeof coins.Data[0]): CoinType => {
          const itemDisplay = item.DISPLAY ? item.DISPLAY[currency] : {},
                itemInfo = item.CoinInfo;
  
          return {
            id: itemInfo.Id,
            name: itemInfo.Name,
            fullName: itemInfo.FullName,
            iconUrl: itemInfo.ImageUrl,
            price: itemDisplay.PRICE,
            high24: itemDisplay.HIGHDAY,
            low24: itemDisplay.LOWDAY,
            open24: itemDisplay.OPEN24HOUR,
            change24: itemDisplay.CHANGE24HOUR,
            change24Hour: itemDisplay.CHANGEPCT24HOUR,
          };
        });
  
        dispatch(getCoins(coinData));
      } catch {
        dispatch(errorCoins())
      }
    };
  };