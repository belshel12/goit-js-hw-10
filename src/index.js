import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
refs.countryList.style.paddingInlineStart = '0';

function onInput(e) {
  const country = e.target.value.trim();

  if (!e.target.value || !country) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  } else {
    fetchCountries(country)
      .then(response => {
        if (response.length > 10) {
          notifyOfManyCountries();
        } else if ((response.length > 1) & (response.length <= 10)) {
          createCountries(response);
          refs.countryInfo.innerHTML = '';
        } else if (response.length === 1) {
          createInfo(response);
          refs.countryList.innerHTML = '';
        }
      })
      .catch(error => Notiflix.Notify.failure(error));
  }
}

function createCountries(arr) {
  const markup = arr
    .map(
      ({ name, flags }) =>
        `<li style = "display: flex; align-items: center; margin-bottom: 10px;">
		  		<img src = ${flags.svg}  style = " width: 25px; height: 20px; margin-right: 10px;" ></img>
				<h2 style = "font-weight: normal; font-size: 16px;margin-bottom: 0; margin-top: 0;">${name.official}</h2>
			</li>`
    )
    .join('');

  refs.countryList.innerHTML = markup;
}

function createInfo(arr) {
  const markup = arr
    .map(
      ({ name, flags, capital, population, languages }) =>
        `<ul style = "list-style: none; padding-inline-start: 0; margin-top: 0; margin-bottom: 0;">
		  		<li style = "display: flex; align-items: center;">
					<img src = ${
            flags.svg
          } style = "width: 30px; height: 20px; margin-right: 10px;" ></img>
		  			<h2 style = "font-size: 36px; margin-top: 0; margin-bottom: 0;">${
              name.official
            }</h2>
				</li>
		  		<li><h2>Capital: <span style = "font-weight: normal;">${capital}</span></h2></li>
		  		<li><h2>Population: <span style = "font-weight: normal;">${population}</span></h2></li>
		  		<li><h2>Languages: <span style = "font-weight: normal;">${Object.values(
            languages
          )}</span></h2></li>
		  </ul>`
    )
    .join('');
  refs.countryInfo.innerHTML = markup;
}

function notifyOfManyCountries() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
