'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var remove = function (holder) {
    var oldImg = holder.querySelector('img');
    if (oldImg) {
      holder.removeChild(oldImg);
    }
  };

  var reset = function (holder, img) {
    remove(holder);
    holder.appendChild(img);
  };

  var upload = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (!matches) {
      return;
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      remove(preview);
      var newImg = document.createElement('img');
      newImg.src = reader.result;
      newImg.width = 40;
      newImg.height = 44;
      preview.appendChild(newImg);
    });
    reader.readAsDataURL(file);
  };

  window.photo = {
    upload: upload,
    remove: remove,
    reset: reset
  };
})();
