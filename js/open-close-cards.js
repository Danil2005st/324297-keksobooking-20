'use strict';

(function () {
  var filterChangeHandlerOpenCard = function () {
    var popup = document.querySelector('.map__card');

    if (popup) {
      popup.remove();
    }
  };

  var filterChangeHandlerCloseCard = function () {
    var popup = document.querySelector('.map__card');

    popup.querySelector('.popup__close').addEventListener('click', function () {
      popup.remove();
    });
  };
  window.openCloseCards = {
    onPinClickOpen: function () {
      filterChangeHandlerOpenCard();
    },
    onPinClickClose: function () {
      filterChangeHandlerCloseCard();
    }
  };
})();
