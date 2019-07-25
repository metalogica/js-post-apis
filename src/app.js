// API Docs: https://github.com/lewagon/garage-api#wagon---garage-api-
// Part 1: Send an AJAX request to fetch all cars.
const garageName = prompt('Please enter a garage name');

const endpoint = `https://wagon-garage-api.herokuapp.com/${garageName}/cars`
const getCars = () => {
  fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    console.log('get all cars', data);
    renderCars(data);
  });
}
getCars()

// Part 1.1 Build an event listener that will populate the page with list of cars.
const renderCars = (carsArray) => {
  const carsList = document.querySelector('.cars-list');
  carsList.innerHTML = '';
  carsArray.forEach(car => {
    let element =
      `<div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/280/280/Ferrari 308 GTS" />
        </div>
        <div data-id=${car.id} class="car-info">
          <h4>${car.brand} ${car.model}</h4>
          <p><strong>Owner:</strong>${car.owner}</p>
          <p><strong>Plate:</strong>${car.plate}</p>
        </div>
      </div>`
    carsList.insertAdjacentHTML('afterbegin', element);
  })
}

// Part 2: Send an AJAX request to post a car.
const createCar = (formData) => {
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    setTimeout(getCars(), 1000)
  })
}

// Part 2.1: Build event listener on form to submit create car API call
const form = document.getElementById('new-car');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let carData = {};
  Array.from(event.currentTarget.children).forEach( e => {
    carData[e.id] = e.value;
  })
  console.log('form data', carData);
  createCar(carData);
  form.reset();
})
