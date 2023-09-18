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

    function speed_to_minutes(value) {
        var minutes = Math.floor(value);
        var seconds = Math.round((value - minutes) * 60);
        return minutes + 'min' + seconds + 's';
    }

    (function() {
        var $vma = document.getElementById('form_vma_vma'),
            $vo2max = document.getElementById('form_vma_vo2max');

        function onchange(e) {
            var $field = e.target;

            if(!$field){
                return;
            }

            var _vma = parseFloat($vma.value, 10),
                _vo2max = parseFloat($vo2max.value, 10),
                _value = parseFloat($field.value.replace(',', '.'));

            if(!_value){
                return;
            }

            if ($field.getAttribute('name') == 'form_vma_vma') {
                $vo2max.value = (_value * 3.5).toFixed(2);
            }
            if ($field.getAttribute('name') == 'form_vma_vo2max') {
                $vma.value = (_value / 3.5).toFixed(2);
            }

            var _speed = 60 / $vma.value;

            document.getElementById('form_vma_result_aero').innerHTML = speed_to_minutes(_speed);
            document.getElementById('form_vma_result_5k').innerHTML = speed_to_minutes(_speed / 0.94);
            document.getElementById('form_vma_result_10k').innerHTML = speed_to_minutes(_speed / 0.92);
            document.getElementById('form_vma_result_semi').innerHTML = speed_to_minutes(_speed / 0.86);
            document.getElementById('form_vma_result_marathon').innerHTML = speed_to_minutes(_speed / 0.82);
        }

        var _events = ['blur','keyup'];
        for (var i = 0, len = _events.length; i < len; i++) {
            $vma.addEventListener(_events[i], onchange, 1);
            $vo2max.addEventListener(_events[i], onchange, 1);
        }

        $vo2max.dispatchEvent(new Event('blur'));

    }());

});
