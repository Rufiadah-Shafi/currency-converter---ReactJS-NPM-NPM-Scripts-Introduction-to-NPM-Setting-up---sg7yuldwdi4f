import React, { useEffect, useState } from 'react'

export default function CurrencyConverter() {
    let currencies = ['CAD','HKD','CZK','INR','CHF','EUR','JPY','USD','AUD'];
    const [baseCurrency,setBaseCurrency] = useState('USD')
    const [otherCurrency,setOtherCurrency] = useState('INR')
    const [baseValue,setBaseValue] = useState(0)
    const [convertedValue,setConvertedValue] = useState(0)
    const [conversionRate,setConversionRate] = useState(80)
    const handleChangeBaseValue = (e)=>{
        const val = e.target.value
        if(val>=0){
            setBaseValue(val)
            setConvertedValue((val*conversionRate).toFixed(2))
        }
    }
    const handleChangeConvertedValue = (e)=>{
        const val = e.target.value
        if(val>=0){
            setConvertedValue(val)
            setBaseValue((val/conversionRate).toFixed(2))
        }
    }

    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("apikey", "h7h68Tw2vWU8Vmim5w4cquL3AhXBxLVl");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${baseCurrency}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            console.log(result.rates[otherCurrency])
            setConversionRate(result.rates[otherCurrency])
        })
        .catch(error => console.log('error', error));
    },[baseCurrency])
    return (
        <div>
            <h1>Currency Converter</h1>
            <form>
                <select name="baseCurrency" value={baseCurrency} onChange={(e)=>{setBaseCurrency(e.target.value)}}>
                    {currencies.map((currency)=>(
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <input type="number" name='baseCurrency' onChange={(e)=>handleChangeBaseValue(e)} value={baseValue}/>
                <br />
                <select name="otherCurrency" value={otherCurrency} onChange={(e)=>{setOtherCurrency(e.target.value)}}>
                    {currencies.map((currency)=>(
                        baseCurrency!==currency ?
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                            : undefined
                    ))}
                </select>
                <input type="number" name='otherCurrency' value={convertedValue} onChange={(e)=>handleChangeConvertedValue(e)} />
            </form>
        </div>
    )
}
