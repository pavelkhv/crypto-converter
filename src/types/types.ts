export type CoinType = {
  id: string;
  name: string;
  fullName: string;
  iconUrl: string;
  price: string;
  high24: string;
  low24: string;
  open24: string;
  change24: string;
  change24Hour: string;
};

export type ConversionItemType = {
  value: string;
  label: string;
};

export type NewsType = {
  id: string;
  date: number;
  img: string;
  title: string;
  body: string;
  url: string;
  source: string;
};

export type SortType = "latest" | "popular";
export type ThemeType = "dark" | "light";
