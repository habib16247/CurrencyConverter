import { useCallback, useRef, useState } from "react";
import InputBox from "./Components/InputBox";
import useCurrencyHook from "./hooks/useCurrencyHook";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("bdt");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConvertedAount] = useState(0);
  const submitRef = useRef()

  const currencyInfo = useCurrencyHook(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAount(amount);
  };

  const colorSubmit = useCallback(() => {
    submitRef.current.style.backgroundColor = "green"
    submitRef.current.style.color = "white"
    submitRef.current.style.fontSize = "1.5rem"
    submitRef.current.style.boxShadow = `inset 2px 2px 5px rgba(0,0,0,0.6)`
    submitRef.current.innerText = "Converted"
    
    
    setTimeout(() => {
    submitRef.current.style.boxShadow = ""
    submitRef.current.style.backgroundColor = ""
      submitRef.current.innerText = `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`
    }, 400);
  }, [submitRef])

  const convert = () => {
    setConvertedAount(amount * currencyInfo[to])
    
  console.log(currencyInfo[to])
  }

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-[130%] bg-no-repeat "
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-vector/global-currency-background_115579-405.jpg')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form 
              onSubmit={e => {
                e.preventDefault();
                convert()
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="from"
                  amount={amount === 0 ? null : amount}
                  currencyOptions={options}
                  onCurrencyChange={currency => {
                    setFrom(currency)
                  }}
                  onAmountChange={setAmount}
                  selectCurrency={from}
                  // onChange={e => }
                />
              </div>
              <div className="relative w-full h-0.2">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
              <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={currency => {
                    setTo(currency)
                  }}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button 
              type="submit"
              className="w-full bg-blue-600 text-white text-2xl px-4 py-3 rounded-lg"
              onClick={() => colorSubmit()}
              ref={submitRef}
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
