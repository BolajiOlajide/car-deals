define([], function() {
    let limit = 3;
    let lastItemId = null;

    const carInstance = localforage.createInstance({
        name: "cars"
    });

    function addCars(newCars) {
        return new Promise((resolve, reject) => {
            return carInstance.setItems(newCars)
                .then(() => resolve())
                .catch(() => reject());
        })
    }

    async function getCars() {
        let keys = await carInstance.keys();
        let index = keys.indexOf(lastItemId);
        if (index == -1) { index = keys.length };
        if (index == 0) {
            return Promise.resolve([]);
        }

        let paginatedKeys = keys.splice(index - limit, limit);
        const result = await carInstance.getItems(paginatedKeys);
        const formattedData = Object.keys(result).map(k => result[k]).reverse();
        lastItemId = formattedData[formattedData.length - 1].id;
        return formattedData;
    }

    function getLastCarId() {
        return lastItemId;
    }

    return { addCars, getCars, getLastCarId };
});
