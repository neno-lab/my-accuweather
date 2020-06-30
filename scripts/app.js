import AccuWeather from './forecast';

const forma = document.querySelector('.search');
const detalji = document.querySelector('.details');
const kartica = document.querySelector('.card');
const dobaDana = document.querySelector('img.time');
const ikonica = document.querySelector('.icon img');
const accuWeather = new AccuWeather();

//asinkrona f-ja za input
const update = async (inputValue) => {};

//obicna f-ja  preko koje mijenjamo detalje u kartici
const updateUI = (data) => {
  //destrukturiranje da bi bio kraci zapis
  const { city, weather } = data;

  //mogli smo i ovako pa bi onda dalje u innerHTML mijenjali ime u $
  // const cityDetails = data.city;
  // const weatherDetails = data.weather;

  //promjena podataka i zapisivanje istog u html-u
  detalji.innerHTML = `
  <h5 class="city-name">${city.EnglishName}</h5>
  <div class="weather-condition">${weather.WeatherText}</div>
  <div class="temperature">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  `;

  //postavljanje doba dana, dan ili noc
  let dobaDanaImg = null;
  if (weather.IsDayTime) {
    dobaDanaImg = 'img/day.svg';
  } else {
    dobaDanaImg = 'img/night.svg';
  }
  dobaDana.setAttribute('src', dobaDanaImg);

  //postavljanje ikonice vremena
  const ikonicaImg = `img/icons/${weather.WeatherIcon}.svg`;
  ikonica.setAttribute('src', ikonicaImg);

  //prikazivanje kartice
  if (kartica.classList.contains('none')) {
    kartica.classList.remove('none');
  }
};

//eventListener
forma.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = forma.city.value.trim();
  forma.reset();

  accuWeather
    .update(inputValue)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });

  localStorage.setItem('location', inputValue);
});

if (localStorage.getItem('location')) {
  accuWeather
    .update(localStorage.getItem('location'))
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
