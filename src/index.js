import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('input#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInputEnter, DEBOUNCE_DELAY));

function onInputEnter() {
  if (refs.inputEl.value === '') {
    clearMarkup();
    return;
  }
  clearMarkup();
  API.fetchCountry(refs.inputEl.value.trim()).then(checkQuantity).catch(showError);
}

function showError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function checkQuantity(data) {
  if (data.length === 1) {
    return renderCountryCard(data);
  } else if (data.length >= 2 && data.length <= 10) {
    return renderCountryList(data);
  } else {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
  }
}

function renderCountryList(countries) {
  const listMarkup = countries
    .map(({ flags, name }) => {
      return `<li class="country-list__item">
  <img src="${flags.svg}" alt="${name.official}" class="country-list__img" width="40" height="30" />
  <p class="country-list__meta">${name.official}</p>
</li>`;
    })
    .join('');

  refs.countryListEl.insertAdjacentHTML('beforeend', listMarkup);
}

function renderCountryCard(countries) {
  const cardMarkup = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<div>
      <img src="${flags.svg}" alt="${
        name.official
      }" class="country-card__img" width="200" heigh="100"/>
    </div>
    <div class="card-body">
      <h2 class="card-title">${name.official}</h2>
      <p class="card-text"><b>Capital:</b> ${capital}</p>
      <p class="card-text"><b>Population:</b> ${population}</p>
      <p class="card-text"><b>Languages:</b> ${Object.values(languages).join(', ')} </p>
    </div>`;
    })
    .join('');
  refs.countryInfoEl.insertAdjacentHTML('afterbegin', cardMarkup);
}

function clearMarkup() {
  refs.countryInfoEl.innerHTML = '';
  refs.countryListEl.innerHTML = '';
}



