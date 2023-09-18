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
        var hours = Math.floor(value / 60);
         var minutes = Math.floor(value - (hours * 60));
         var seconds = Math.round((value - Math.floor(value)) * 60);

         return (hours ? hours + 'h ' : '') + minutes + '&prime;' + seconds + '&Prime;';
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

            /* Aero */
            document.getElementById('form_vma_result_aero').innerHTML = speed_to_minutes(_speed);

            /* 5k */
            var _speed_5k = _speed / 0.94;
            document.getElementById('form_vma_result_5k').innerHTML = speed_to_minutes(_speed_5k );
            document.getElementById('form_vma_result_5k_duration').innerHTML = speed_to_minutes(_speed_5k *5 );

            /* 10k */
            var _speed_10k = _speed / 0.92;
            document.getElementById('form_vma_result_10k').innerHTML = speed_to_minutes(_speed_10k);
            document.getElementById('form_vma_result_10k_duration').innerHTML = speed_to_minutes(_speed_10k * 10);

            /* Semi */
            var _speed_semi = _speed / 0.86;
            document.getElementById('form_vma_result_semi').innerHTML = speed_to_minutes(_speed_semi);
            document.getElementById('form_vma_result_semi_duration').innerHTML = speed_to_minutes(_speed_semi * 21.1);

            /* Marathon */
            var _speed_mara = _speed / 0.82;
            document.getElementById('form_vma_result_marathon').innerHTML = speed_to_minutes(_speed_mara);
            document.getElementById('form_vma_result_marathon_duration').innerHTML = speed_to_minutes(_speed_mara * 42.195);
        }

        var _events = ['blur','keyup'];
        for (var i = 0, len = _events.length; i < len; i++) {
            $vma.addEventListener(_events[i], onchange, 1);
            $vo2max.addEventListener(_events[i], onchange, 1);
        }

        $vo2max.dispatchEvent(new Event('blur'));

    }());

});
