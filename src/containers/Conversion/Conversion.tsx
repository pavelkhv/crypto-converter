import React, {useEffect, useReducer, useState, useMemo, useCallback} from "react";
import { connect, ConnectedProps } from "react-redux";
import Select, { ValueType } from "react-select";

import { ThemeType, ConversionItemType } from "../../types/types";
import { reducer, initialState } from "./reducer";
import { setOptionAction, changeValueAction, getHistory, getPrice } from "./actions";

import ChartLine from "../../components/ChartLine/ChartLine";
import Preloader from "../../components/Preloader/Preloader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import conversionList from "../../assets/ts/conversionList";
import "./conversion.scss";

type StateType = {
  theme: ThemeType;
};
type PropsFromReduxType = ConnectedProps<typeof connector>;

const mapStateToProps = (state: StateType) => ({
  theme: state.theme,
});
const connector = connect(mapStateToProps, {});

const commonURL = "https://min-api.cryptocompare.com/data/";

const Conversion: React.FC<PropsFromReduxType> = ({ theme }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {from, to, chartData, loading, errorMessage, rate} = state;

  const date = useMemo(() => {
    const currentDate = new Date();
    return `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  }, [from.option, to.option]);

  const onInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, direction: string) => {
      const value: string = e.target.value;
      const convertedValue: number =
        direction === "from" ? +value * rate : +value / rate;
      const toFixedValue: string = 
        (Math.floor(convertedValue * 100000) / 100000).toString();

      direction === "from"
        ? dispatch(changeValueAction(value, toFixedValue))
        : dispatch(changeValueAction(toFixedValue, value));
    },
    [rate]
  );

  // Get price
  useEffect(() => {
    const url = `${commonURL}price?fsym=${from.option.value}&tsyms=${to.option.value}`;

    (async function() {
      await getPrice(url, dispatch, from.value, to.option.value);
    })();
  }, [from.option, to.option]);

  // Get history prices for a week
  useEffect(() => {
    const url = `${commonURL}v2/histoday?&fsym=${from.option.value}&tsym=${to.option.value}`;

    (async function() {
      await getHistory(url, dispatch);
    })();
  }, [from.option, to.option]);

  return (errorMessage ? <ErrorMessage message={errorMessage} /> :
    <div className="conversion">
      <div className={`conversion-block conversion-block_${theme}`}>
        <div className={`conversion-block__info conversion-block__info_${theme}`}>
          <p className="conversion-block__rate">
            1 {from.option.value} = {rate} {to.option.value}
          </p>
          <p className="conversion-block__date"> Data for {date}</p>
        </div>

        <div className="conversion-block__row">
          <Select
            className={`conversion-block__select conversion-block__select_${theme}`}
            value={from.option}
            onChange={(option: ValueType<ConversionItemType>) => {
              dispatch(setOptionAction(option as ConversionItemType, "from"));
            }}
            options={conversionList}
          />

          <Select
            className={`conversion-block__select conversion-block__select_${theme}`}
            value={to.option}
            onChange={(option: ValueType<ConversionItemType>) => {
              dispatch(setOptionAction(option as ConversionItemType, "to"));
            }}
            options={conversionList}
          />
        </div>

        <div className="conversion-block__row">
          <input
            className={`conversion-block__input conversion-block__input_${theme}`}
            onChange={(e) => onInput(e, "from")}
            type="number"
            value={from.value}
          />
          <input
            className={`conversion-block__input conversion-block__input_${theme}`}
            onChange={(e) => onInput(e, "to")}
            type="number"
            value={to.value}
          />
        </div>

        <span className="conversion-block__description">
          Values are rounded to 5 decimal places.
        </span>

        <ChartLine theme={theme} chartData={chartData} />
        
        {loading ? <Preloader theme={theme} /> : ""}
      </div>
    </div>
  );
};

export default connector(Conversion);
