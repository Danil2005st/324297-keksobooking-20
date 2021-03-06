'use strict';

(function () {
  var KEY_CODE_ESCAPE = 'Escape';

  var main = document.querySelector('main');
  var successBlock = document.querySelector('#success').content.querySelector('.success');
  var successMessageText = 'success__message';
  var errorBlock = document.querySelector('#error').content.querySelector('.error');
  var errorMessageText = 'error__message';

  var closeSuccess = function () {
    var successMessage = document.querySelector('.success');
    successMessage.addEventListener('click', removeSuccess);
    document.addEventListener('keydown', removeSuccessByKey);
  };

  var removeSuccess = function (evt) {
    var successMessage = document.querySelector('.success');
    if (evt.target.className !== successMessageText) {
      successMessage.remove();
      document.removeEventListener('keydown', removeSuccessByKey);
      successMessage.removeEventListener('click', removeSuccess);
    }
  };

  var removeSuccessByKey = function (evt) {
    var successMessage = document.querySelector('.success');
    if (evt.key === KEY_CODE_ESCAPE) {
      successMessage.remove();
      document.removeEventListener('keydown', removeSuccessByKey);
      successMessage.removeEventListener('click', removeSuccess);
    }
  };

  var closeError = function () {
    var errorMessage = document.querySelector('.error');
    errorMessage.addEventListener('click', removeError);
    document.addEventListener('keydown', removeErrorByKey);
  };

  var removeError = function (evt) {
    var errorMessage = document.querySelector('.error');
    if (evt.target.className !== errorMessageText) {
      errorMessage.remove();
      document.removeEventListener('keydown', removeErrorByKey);
      errorMessage.removeEventListener('click', removeError);
    }
  };

  var removeErrorByKey = function (evt) {
    var errorMessage = document.querySelector('.error');
    if (evt.key === KEY_CODE_ESCAPE) {
      errorMessage.remove();
      document.removeEventListener('keydown', removeErrorByKey);
      errorMessage.removeEventListener('click', removeError);
    }
  };

  var showSuccess = function () {
    var messageBlock = successBlock.cloneNode(true);
    main.appendChild(messageBlock);
    closeSuccess();
  };

  var showError = function () {
    var messageBlock = errorBlock.cloneNode(true);
    main.appendChild(messageBlock);
    closeError();
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
