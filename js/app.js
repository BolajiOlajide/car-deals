const carService = require('./carService.js');

window.pageEvents = {
    loadCarPage(carId) {
        carService.loadCarPage(carId);
    }
}

carService.loadMoreRequest();
