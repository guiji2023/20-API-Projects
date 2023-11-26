

const getCurrencyData = async(currency) => {
    const url = `https://api.exchangerate-api.com/v4/latest/${currency}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data.rates;
    }catch(err){console.log(err);}

};

const swapCurrency = () => {

        const currencyOne = document.querySelector('#currency-one');
        const currencyTwo = document.querySelector('#currency-two');

        const currencyOneOptions = document.querySelectorAll('#currency-one option');
        const currencyTwoOptions = document.querySelectorAll('#currency-two option');

        let selectedCurrencyOne = document.querySelector('#currency-one option:checked');
        let selectedCurrencyTwo = document.querySelector('#currency-two option:checked');

        // store all the nodes / the nodelist into an array to the the index of certain node
        const optionsArr1 = [...currencyOneOptions];
        const optionsArr2 = [...currencyTwoOptions];

        //find the index of the selected currency node in the option node list

        let index1 = optionsArr1.indexOf(selectedCurrencyOne);
        let index2 = optionsArr2.indexOf(selectedCurrencyTwo);
        
        // swap the two nodes by referencing each other's indexes
        currencyOne.selectedIndex = index2;
        currencyTwo.selectedIndex = index1;

        //reset the input value of currency one

        document.querySelector('#amount-one').value = "1";

        return [currencyOne, currencyTwo];
}

const updateExchangeResult = async()=>{

    const selectedCurrencyOne = document.querySelector('#currency-one option:checked');
    const selectedCurrencyTwo = document.querySelector('#currency-two option:checked');

    const amountOne = document.querySelector('#amount-one');
    const inputValue = +amountOne.value;
    const amountTwo = document.querySelector('#amount-two');
    const rate = document.querySelector('#rate');
    

    const ratesAPIData = await getCurrencyData(selectedCurrencyOne.value);

    const rateValue = ratesAPIData[selectedCurrencyTwo.value]; 
    rate.innerText = rateValue;

    const outputValue = inputValue * rateValue;

    amountTwo.setAttribute('value', `${outputValue.toFixed(2)}`);

}

(async () => {
    updateExchangeResult();

    
    // currency selection change event handler
    const currencySelections = document.querySelectorAll('select');
    currencySelections.forEach((selection)=>{
        selection.addEventListener('change',()=>{
            updateExchangeResult();
        });
    });
    
    
    document.querySelector('#amount-one').addEventListener('change',()=>{
        updateExchangeResult();
    });


    
    // btn_swap click event handler
    document.querySelector('#swap').addEventListener('click', async() => {

        [currencyOne, currencyTwo] =swapCurrency(); 
        updateExchangeResult();

    }); 


})();