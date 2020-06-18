'use strict';

(function () {
  var filterChangeHandler = function (pinElement) {

    pinElement.addEventListener('click', function () {
      var popup = document.querySelector('.map__card');
      if (popup) {
        popup.remove();
      }
      var pinElementIndex = pinElement.getAttribute('data-opener');
      window.getCards(window.data[pinElementIndex]);
      popup.querySelector('.popup__close').addEventListener('click', function () {
        popup.remove();
      });
    });
  };

  window.popup = {
    onPinClick: function () {
      var pinsCollection = document.querySelectorAll('[data-opener]');
      for (var i = 0; i < pinsCollection.length; i++) {
        filterChangeHandler(pinsCollection[i]);
      }
    }
  };
})();
