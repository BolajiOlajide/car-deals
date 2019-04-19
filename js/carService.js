define(['./template.js'], function(template) {
    'use strict';
    const baseUrl = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service';
    const latestDealsUrl = `${baseUrl}/latest-deals.php`;
    const carDetailUrl = `${baseUrl}/car.php?carId=`;

    function loadMoreRequest() {
        return fetch(latestDealsUrl)
            .then((response) => (response.json()))
            .then(data => {
                template.appendCars(data.cars)
            });
    }

    function loadCarPage(carId) {
        return fetch(`${carDetailUrl}${carId}`)
            .then(response => response.text())
            .then(data => document.body.insertAdjacentHTML('beforeend', data))
            .catch(() => alert(`Oops couldn't fetch Car ${carId}`));
    }

    return { loadMoreRequest, loadCarPage };
});