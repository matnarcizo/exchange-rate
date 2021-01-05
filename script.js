const currencyFromEl = document.getElementById('currency-from')
const amountFromEl = document.getElementById('amount-from')
const currencyToEl = document.getElementById('currency-to')
const amountToEl = document.getElementById('amount-to')
const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

const EXCHANGE_API_URL = `https://v6.exchangerate-api.com/v6/${config.exchangeRateApiKey}/latest/`

function calculate() {
  const currencyFrom = currencyFromEl.value
  const currencyTo = currencyToEl.value

  fetch(`${EXCHANGE_API_URL}${currencyFrom}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[currencyTo]

      rateEl.innerText = `1 ${currencyFrom} = ${rate} ${currencyTo}`
      amountToEl.value = (amountFromEl.value * rate).toFixed(2)
    })
}

calculate()

currencyFromEl.addEventListener('change', calculate)
amountFromEl.addEventListener('input', calculate)
currencyToEl.addEventListener('change', calculate)
amountToEl.addEventListener('input', calculate)

swap.addEventListener('click', () => {
  const temp = currencyFromEl.value
  currencyFromEl.value = currencyToEl.value
  currencyToEl.value = temp
  calculate()
})
