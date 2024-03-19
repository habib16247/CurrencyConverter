import React, { useId } from "react";

const InputBox = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) => {
  const amountInputId = useId()
  // console.log(currencyOptions)
  return (
    <div
      className={`bg-white p-3 rounded-lg text-sm flex max-w-[500px] m-auto mt-6 ${className}`}
    >
      <div className="w-1/2">
        <label 
        className="text-black/40 mb-2 inline-block"
        htmlFor={amountInputId}
        >
          {label}
        </label>
        <input
          id={amountInputId}
          type="number"
          className="outline-none w-full bg-transparent py-5"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => {
              onAmountChange && onAmountChange(Number(e.target.value))
              console.log(amount)
            }
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(e) => {
            console.log(e.target.value)
            onCurrencyChange && onCurrencyChange(e.target.value)
          }}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>{currency.toUpperCase()}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
