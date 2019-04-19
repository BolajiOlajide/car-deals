const carService = require('./carService.js');

window.pageEvents = {
    loadCarPage(carId) {
        carService.loadCarPage(carId);
    },
    loadMore() {
        carService.loadMoreRequest();
    }
}

carService.loadMoreRequest();
