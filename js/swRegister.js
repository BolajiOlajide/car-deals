define([], function () {
  'use strict';
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(swRegistration => console.log(swRegistration));
  }
});
