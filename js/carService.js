define(['./template.js', './clientStorage.js'], function(template, clientStorage) {
    'use strict';
    const baseUrl = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service';
    const latestDealsUrl = `${baseUrl}/latest-deals.php`;
    const carDetailUrl = `${baseUrl}/car.php?carId=`;

    async function loadMoreRequest () {
        const status = await fetchPromise();
        document.getElementById('connection-status').innerHTML = status;
        await loadMore()
    }

    async function fetchPromise() {
        try {
            const response = await fetch(`${latestDealsUrl}?carId=${clientStorage.getLastCarId()}`)
            const jsonResponse = await response.json();
            await clientStorage.addCars(jsonResponse.cars)
            return 'Connection is OK. Showing latest results.';
        } catch (error) {
            return 'No connection. Showing offline results.';
        }
    }

    async function loadMore() {
        const cars = await clientStorage.getCars();
        template.appendCars(cars);
    }

    async function loadCarPage(carId) {
        try {
            const response = await fetch(`${carDetailUrl}${carId}`);
            const data = await response.text();
            document.body.insertAdjacentHTML('beforeend', data);
        } catch (error) {
            alert(`Oops couldn't fetch Car ${carId}`);
        }
    }

    return { loadMoreRequest, loadCarPage };
});