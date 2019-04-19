const carService = require('./carService.js');
const swRegister = require('./swRegister.js');

window.pageEvents = {
  loadCarPage(carId) {
    carService.loadCarPage(carId);
  },
  loadMore() {
    carService.loadMoreRequest();
  }
}

carService.loadMoreRequest();
