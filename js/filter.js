'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');

  window.filter = {
    onHousingTypeChange: function () {
      housingType.addEventListener('change', function () {
        var updateHousingType = housingType.value;

        console.log(updateHousingType);
      });
    }
  };
})();
