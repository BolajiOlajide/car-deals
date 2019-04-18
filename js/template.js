define([], function() {
    function generateCarCard(car) {
        let template = document.querySelector('#car-card').innerHTML;
        let title = `${car.brand} ${car.model} ${car.year}`;
        template = template.replace('{{title}}', title);
        template = template.replace('{{image}}', car.image);
        template = template.replace('{{price}}', car.price);
        return template;
    }

    function appendCars(cars) {
        document.getElementById('first-load').innerHTML = "";

        let cardHTML = "";

        for (let i = 0; i < cars.length; i++) {
            cardHTML += generateCarCard(cars[i].value);
        }

        document.querySelector('.mdl-grid').insertAdjacentHTML('beforeend', cardHTML);

        document.querySelector('.mdl-layout__content').style.display = 'none';
        document.querySelector('.mdl-layout__content').style.display = 'inline-block';
    }

    return { appendCars };
});
