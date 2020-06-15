'use strict';

(function () {
  var hiddenClass = 'hidden';
  var filterChangeHandler = function (pinElement) {
    pinElement.addEventListener('click', function () {
      var collectionPopup = document.querySelectorAll('[data-opener-popup]');
      var pinElementIndex = pinElement.getAttribute('data-opener');

      for (var i = 0; i < collectionPopup.length; i++) {
        collectionPopup[i].classList.add(hiddenClass);
      }

      var popup = document.querySelector('[data-opener-popup="' + pinElementIndex + '"]');
      popup.classList.remove(hiddenClass);

      popup.querySelector('.popup__close').addEventListener('click', function () {
        popup.classList.add(hiddenClass);
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
