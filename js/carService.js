define([], function() {
    'use strict';
    const baseUrl = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/';
    const latestDealsUrl = `${baseUrl}latest-deals.php`;

    function loadMoreRequest() {
        return fetch(latestDealsUrl)
            .then((response) => response.json())
            .then(data => console.log(data));
    }
    return { loadMoreRequest };
});