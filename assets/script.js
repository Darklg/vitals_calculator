document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    (function() {
        var $weight = document.getElementById('form_imc_weight'),
            $height = document.getElementById('form_imc_height'),
            $result = document.getElementById('form_imc_result');

        function onchange() {
            var _weight = parseFloat($weight.value, 10),
                _height = parseFloat($height.value, 10),
                _result = _weight * 1000000 / (_height * _height);
            $result.innerHTML = Math.floor(_result) / 100;
        }

        var _events = ['keydown', 'click', 'change'];
        for (var i = 0, len = _events.length; i < len; i++) {
            $weight.addEventListener(_events[i], onchange, 1);
            $height.addEventListener(_events[i], onchange, 1);
        }

        onchange();

    }());

});
