import React, { useEffect, useState } from "react";

export default function CurrencyConverter() {
  let currencies = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTC",
    "BTN",
    "BWP",
    "BYN",
    "BYR",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LTL",
    "LVL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRO",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "STD",
    "SVC",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XAG",
    "XAU",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMK",
    "ZMW",
    "ZWL",
  ];
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [otherCurrency, setOtherCurrency] = useState("INR");
  const [baseValue, setBaseValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const [conversionRate, setConversionRate] = useState({});
  const handleChangeBaseValue = (e) => {
    const val = e.target.value;
    if (val >= 0) {
      setBaseValue(val);
      setConvertedValue((val * conversionRate[otherCurrency]).toFixed(2));
    }
  };
  const handleChangeConvertedValue = (e) => {
    const val = e.target.value;
    if (val >= 0) {
      setConvertedValue(val);
      setBaseValue((val / conversionRate[otherCurrency]).toFixed(2));
    }
  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "h7h68Tw2vWU8Vmim5w4cquL3AhXBxLVl");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api.apilayer.com/exchangerates_data/latest?base=${baseCurrency}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // console.log(result.rates[otherCurrency])
        setConversionRate(result.rates);
      })
      .catch((error) => console.log("error", error));
  }, [baseCurrency]);
  return (
    <div>
      <h1>Currency Converter</h1>
      <form>
        <select
          name="baseCurrency"
          value={baseCurrency}
          onChange={(e) => {
            setBaseCurrency(e.target.value);
          }}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="baseCurrency"
          onChange={(e) => handleChangeBaseValue(e)}
          value={baseValue}
        />
        <br />
        <select
          name="otherCurrency"
          value={otherCurrency}
          onChange={(e) => {
            setOtherCurrency(e.target.value);
          }}
        >
          {currencies.map((currency) =>
            baseCurrency !== currency ? (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ) : undefined
          )}
        </select>
        <input
          type="number"
          name="otherCurrency"
          value={convertedValue}
          onChange={(e) => handleChangeConvertedValue(e)}
        />
      </form>
    </div>
  );
}
