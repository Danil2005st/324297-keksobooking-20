'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  var onError = function (message) {
    return message;
  };

  var onSuccess = function (data) {
    window.xhrData = data;
  };

  window.load(URL, onSuccess, onError);
})();
