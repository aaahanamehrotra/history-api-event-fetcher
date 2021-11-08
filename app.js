todayEvents()
const inputdate = document.querySelector("input#date")
const inputmonth = document.querySelector("input#month")
document.querySelector('form').addEventListener('submit', getData)
const map = {
	1: 31,
	2: 29,
	3: 31,
	4: 30,
	5: 31,
	6: 30,
	7: 31,
	8: 31,
	9: 30,
	10: 31,
	11: 30,
	12: 31,

}

const monthValidation = (m) => Object.keys(map).includes(m) ? true : "Invalid Month";
const dateValidation = (m, d) => (d <= map[m] && d > 0) ? true : "Invalid Date"
function getData(event){
	event.preventDefault();
	const month = String(Number(inputmonth.value))
	const date = String(Number(inputdate.value))
	// console.log(month, date)
	const validations = [monthValidation(month), dateValidation(month, date)]
	const allFieldsValid = validations.every((validation) => validation === true);
	if (!allFieldsValid){todayEvents(); alert(validations.find((m) => typeof m === "string")); return;}
	const dateString = (inputdate.value !== "") ? `/${inputdate.value}` : "";
	const monthString = (inputmonth.value !== "") ? `/${inputmonth.value}` : "";
	// console.log(monthString, dateString)
	fetch(`https://history.muffinlabs.com/date${monthString}${dateString}`)
	.then((response) => response.json())
	.then((data) => {let obj = data.data
		final = ''
		for(x in obj){
			// console.log(x)
			final += `<h1>${x}\n</h1>`
			for(y in obj[x]){
				valOne=obj[x][y]["year"]
				valTwo=obj[x][y]["text"]
				final +=`<div class="valOne">${valOne}</div>
				<div class="valTwo">${valTwo}</div><hr>`
			}
			document.querySelector('#empty').innerHTML = (final)
		}
});
}

function todayEvents(){
	fetch('https://history.muffinlabs.com/date')
	.then((response) => response.json())
	.then((data) => {let obj = data.data
		final = ''
		for(x in obj){
			// console.log(x)
			final += `<h1>${x}\n</h1>`
			for(y in obj[x]){
				valOne=obj[x][y]["year"]
				valTwo=obj[x][y]["text"]
				final +=`<div class="valOne">${valOne}</div>
				<div class="valTwo">${valTwo}</div><hr>`
			}
			document.querySelector('#empty').innerHTML = (final)
		}
});
}