'use strict';

(function () {
  var main = document.querySelector('main');
  var successBlock = document.querySelector('#success').content.querySelector('.success');
  var successMessage = 'success__message';
  var errorBlock = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = 'error__message';
  var errorButtonClass = 'error__button';

  var onClick = function (item, message) {
    item.addEventListener('click', function (evt) {
      if (evt.target.className !== message && evt.target.className !== errorButtonClass) {
        item.remove();
      }
    });
  };

  var onEscPress = function (item) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        item.remove();
      }
    });
  };

  var close = function (item, message) {
    onClick(item, message);
    onEscPress(item);
  };

  var success = function () {
    var messageBlock = successBlock.cloneNode(true);
    main.appendChild(messageBlock);
    close(messageBlock, successMessage);
  };

  var error = function () {
    var messageBlock = errorBlock.cloneNode(true);
    main.appendChild(messageBlock);
    close(messageBlock, errorMessage);
    var errorButton = document.querySelector('.' + errorButtonClass);

    errorButton.addEventListener('click', function () {
      messageBlock.remove();
    });
  };

  window.message = {
    success: success,
    error: error
  };
})();
