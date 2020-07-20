'use strict';

(function () {
  var main = document.querySelector('main');
  var successBlock = document.querySelector('#success').content.querySelector('.success');
  var successMessageText = 'success__message';
  var errorBlock = document.querySelector('#error').content.querySelector('.error');
  var errorMessageText = 'error__message';

  var closeSuccess = function () {
    var successMessage = document.querySelector('.success');
    successMessage.addEventListener('click', removeSuccess);
    document.addEventListener('keydown', removeSuccessKey);
  };

  var removeSuccess = function (evt) {
    var successMessage = document.querySelector('.success');
    if (evt.target.className !== successMessageText) {
      successMessage.remove();
      document.removeEventListener('keydown', removeSuccessKey);
      successMessage.removeEventListener('click', removeSuccess);
    }
  };

  var removeSuccessKey = function (evt) {
    var successMessage = document.querySelector('.success');
    if (evt.key === 'Escape') {
      successMessage.remove();
      document.removeEventListener('keydown', removeSuccessKey);
      successMessage.removeEventListener('click', removeSuccess);
    }
  };

  var closeError = function () {
    var errorMessage = document.querySelector('.error');
    errorMessage.addEventListener('click', removeError);
    document.addEventListener('keydown', removeErrorKey);
  };

  var removeError = function (evt) {
    var errorMessage = document.querySelector('.error');
    if (evt.target.className !== errorMessageText) {
      errorMessage.remove();
      document.removeEventListener('keydown', removeErrorKey);
      errorMessage.removeEventListener('click', removeError);
    }
  };

  var removeErrorKey = function (evt) {
    var errorMessage = document.querySelector('.error');
    if (evt.key === 'Escape') {
      errorMessage.remove();
      document.removeEventListener('keydown', removeErrorKey);
      errorMessage.removeEventListener('click', removeError);
    }
  };

  var success = function () {
    var messageBlock = successBlock.cloneNode(true);
    main.appendChild(messageBlock);
    closeSuccess();
  };

  var error = function () {
    var messageBlock = errorBlock.cloneNode(true);
    main.appendChild(messageBlock);
    closeError();
  };

  window.message = {
    success: success,
    error: error
  };
})();
