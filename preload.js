const numberFormat = require('./js/number-format')
const { render: timeago } = require('timeago.js')

function getData () {
	fetch('https://api.exchangeratesapi.io/latest?base=USD')
  .then((response) => response.json())
  .then((data) => {
  	let idr = numberFormat(data.rates.IDR)
  	document.getElementById('fc--item').innerHTML = `
  		<span class="fc--currency">USD 1</span>
      <span class="fc--equal">=</span>
      <span class="fc--currency">IDR ${idr}</span>
      <span class="fc--time" id="fc--time" datetime="${new Date()}"></span>
      <img src="./images/currency.png" class="fc--currency-image">
  	`
  	timeago(document.getElementById('fc--time'))
  })
  .catch(() => {
  	document.getElementById('fc--item').innerHTML = `<div class="fc--message__error">Can not get data from the API</div>`
  });
}

window.addEventListener('DOMContentLoaded', () => {
	setInterval(() => {
		getData()
	}, 180000)

  getData()
})
