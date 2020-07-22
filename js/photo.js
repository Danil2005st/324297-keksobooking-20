'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var onRemove = function (holder) {
    var oldImg = holder.querySelector('img');
    if (oldImg) {
      holder.removeChild(oldImg);
    }
  };

  var onReset = function (holder, img) {
    onRemove(holder);
    holder.appendChild(img);
  };

  var onUpload = function (fileChooser, preview) {
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
      onRemove(preview);
      var newImg = document.createElement('img');
      newImg.src = reader.result;
      newImg.width = 40;
      newImg.height = 44;
      preview.appendChild(newImg);
    });
    reader.readAsDataURL(file);
  };

  window.photo = {
    upload: onUpload,
    remove: onRemove,
    reset: onReset
  };
})();
