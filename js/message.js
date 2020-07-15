'use strict';

(function () {
  var main = document.querySelector('main');
  var successBlock = document.querySelector('#success').content.querySelector('.success');
  var errorBlock = document.querySelector('#error').content.querySelector('.error');

  var onEscPress = function (item) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        item.remove();
      }
    });
  };

  var close = function (item) {
    item.addEventListener('click', function () {
      item.remove();
    });
    onEscPress(item);
  };

  var success = function () {
    var message = successBlock.cloneNode(true);
    main.appendChild(message);
    close(message);
  };

  var error = function () {
    var message = errorBlock.cloneNode(true);
    main.appendChild(message);
    close(message);
  };

  window.message = {
    success: success,
    error: error
  };
})();
