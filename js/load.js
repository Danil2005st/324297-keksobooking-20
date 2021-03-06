'use strict';

(function () {
  var statusCodeOk = 200;

  window.load = function (URL, onSuccess, onError, formData) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCodeOk) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    if (formData) {
      xhr.open('POST', URL);
      xhr.send(formData);
    } else {
      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
