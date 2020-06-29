import React, {useEffect, useReducer, useState, useMemo, useCallback} from "react";
import { connect, ConnectedProps } from "react-redux";
import Select, { ValueType } from "react-select";

import { ThemeType, ConversionItemType } from "../../types/types";
import { reducer, initialState } from "./reducer";
import { setOptionAction, changeValueAction, setChartAction, setLoadingAction } from "./actions";

import ChartLine from "../../components/ChartLine/ChartLine";
import Preloader from "../../components/Preloader/Preloader";

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

const Conversion: React.FC<PropsFromReduxType> = ({ theme }) => {
  const [{from, to, chartData, loading}, dispatch] = useReducer(reducer, initialState);
  const [rate, setRate] = useState<number>(0);

  const date = useMemo(() => {
    const currentDate = new Date();
    return `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  }, [from.option, to.option]);

  const onInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, direction: string) => {
      const value: string = e.target.value,
        convertedValue: number =
          direction === "from" ? +value * rate : +value / rate,
        toFixedValue: string = (
          Math.floor(convertedValue * 100000) / 100000
        ).toString();

      direction === "from"
        ? dispatch(changeValueAction(value, toFixedValue))
        : dispatch(changeValueAction(toFixedValue, value));
    },
    [rate]
  );

  useEffect(() => {
    const url = "https://min-api.cryptocompare.com/data/price?";

    dispatch(setLoadingAction(true));
    
    fetch(`${url}fsym=${from.option.value}&tsyms=${to.option.value}`)
      .then((res) => res.json())
      .then((res) => {
        const toFixedValue: string = (
          Math.floor(+from.value * res[to.option.value] * 1000000) / 1000000
        ).toString();

        setRate(res[to.option.value]);
        dispatch(changeValueAction(from.value, toFixedValue));
        dispatch(setLoadingAction(false));
      });
  }, [from.option, to.option]);

  useEffect(() => {
    const url = "https://min-api.cryptocompare.com/data/v2/histoday?";
    
    fetch(`${url}fsym=${from.option.value}&tsym=${to.option.value}&limit=6`)
      .then((res) => res.json())
      .then((res) => {
        let labels: Array<string> = [],
            datasets: Array<number> = [],
            data = res.Data.Data;

        data.forEach((item: typeof data[0]) => {
          const date = new Date(item.time * 1000).toDateString();
          
          labels.push(date);
          datasets.push(item.high);
        });

        dispatch(setChartAction(labels, datasets));
      });
  }, [from.option, to.option]);

  return (
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
      </div>

      {loading ? <Preloader theme={theme} /> : ""}
    </div>
  );
};

export default connector(Conversion);
