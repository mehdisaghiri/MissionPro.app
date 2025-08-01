import currency from "currency.js";

const formatMoney = (amount: number, currencyCode: string) => {
  const symbol = currencyCode === "GBP" ? "DH " : "$";

  return currency(amount, {
    symbol,
    precision: 2,
    separator: ",",
    decimal: ".",
  }).format();
};

export default formatMoney;
