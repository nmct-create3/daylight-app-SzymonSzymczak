let DomSun;


// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
	//Get hours from milliseconds
	const date = new Date(timestamp * 1000);
	// Hours part from the timestamp
	const hours = '0' + date.getHours();
	// Minutes part from the timestamp
	const minutes = '0' + date.getMinutes();
	// Seconds part from the timestamp (gebruiken we nu niet)
	// const seconds = '0' + date.getSeconds();

	// Will display time in 10:30(:23) format
	return hours.substr(-2) + ':' + minutes.substr(-2); //  + ':' + s
}

// 5 TODO: maak updateSun functie
const updateSun = function (procentDone) {
	tijdNu = new Date(Date.now());
	DomSun.setAttribute("data-time", tijdNu.toLocaleTimeString().slice(0, 5))
	if (procentDone <= 50) {
		DomSun.style = `bottom: ${procentDone * 2}%; left: ${procentDone}%;`;
	}
	else {
		procentBottom = (50 - (procentDone - 50)) * 2;
		DomSun.style = `bottom: ${procentBottom}%; left: ${procentDone}%;`;
	}

}


// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (totalMinutes, sunrise) => {
	DomSun = document.querySelector(".js-sun")
	let minutesDone = ((Date.now() - sunrise) / 60000)
	let ProcentDone = (minutesDone / totalMinutes) * 100;
	console.log(ProcentDone);
	updateSun(ProcentDone);

	// In de functie moeten we eerst wat zaken ophalen en berekenen.
	// Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
	// Bepaal het aantal minuten dat de zon al op is.
	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
	// We voegen ook de 'is-loaded' class toe aan de body-tag.
	// Vergeet niet om het resterende aantal minuten in te vullen.
	// Nu maken we een functie die de zon elke minuut zal updaten
	// Bekijk of de zon niet nog onder of reeds onder is
	// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
	// PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = function (json) {
	const sunriseTime = document.querySelector('.js-sunrise');
	const sunsetTime = document.querySelector('.js-sunset');
	const location = document.querySelector('.js-location');
	const timeLeft = document.querySelector('.js-time-left');


	let timeSunrise = new Date(0);
	let timeSunset = new Date(0);
	timeSunrise.setUTCSeconds(json.city.sunrise);
	timeSunset.setUTCSeconds(json.city.sunset);
	let sunlightLeft = Math.round((timeSunset - Date.now()) / 60000);
	console.log(sunlightLeft)
	timeLeft.innerHTML = String(sunlightLeft);
	sunriseTime.innerHTML = timeSunrise.toLocaleTimeString().slice(0, 5);
	sunsetTime.innerHTML = timeSunset.toLocaleTimeString().slice(0, 5);
	location.innerHTML = `${json.city.name},${json.city.country}`
	let totalTimeMinutes = (timeSunset - timeSunrise) / 60000
	placeSunAndStartMoving(totalTimeMinutes, timeSunrise);
	// We gaan eerst een paar onderdelen opvullen
	// Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
	// Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
	// Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = (lat, lon) => {
	const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=59705d4204894a2d625dfc5bbe027817&units=metric&lang=nl&cnt=1`
	// Eerst bouwen we onze url op
	// Met de fetch API proberen we de data op te halen.
	fetch(url)
		.then(function (response) {
			if (!response.ok) {
				throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
			} else {
				console.info('Er is een response teruggekomen van de server');
				return response.json();
			}
		})
		.then(function (jsonObject) {
			console.info('json object is aangemaakt');
			console.info('verwerken data');
			showResult(jsonObject)
		})
		.catch(function (error) {
			console.error(`fout bij verwerken json ${error}`);
		});
	// Als dat gelukt is, gaan we naar onze showResult functie.
};

document.addEventListener('DOMContentLoaded', function () {
	// 1 We will query the API with longitude and latitude.
	getAPI(50.8027841, 3.2097454);
});
