import { ThunkAction } from "redux-thunk";

import { GET_COINS } from "../actionTypes";
import { CoinType } from "../../types/types";
import { AppStoreType } from "../reducers/rootReducer";

type GetCoinsActionType = {
  type: typeof GET_COINS;
  payload: {
    coins: Array<CoinType>;
  };
};

export type ActionCoinsTypes = GetCoinsActionType;

export const getCoinsAction = (currency: string): ThunkAction<void, AppStoreType, unknown, ActionCoinsTypes> => {
  return (dispatch) => {
    fetch(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=${currency}`)
      .then((res) => res.json())
      .then((res) => {
        const data = res.Data;

        const coinData = data.map((item: typeof data[0]) => {
          const itemDisplay = item.DISPLAY[currency],
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
      });
  };
};

const getCoins = (coins: Array<CoinType>): GetCoinsActionType => ({
  type: GET_COINS,
  payload: {
    coins,
  },
});
