document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    (function() {
        var $weight = document.getElementById('form_imc_weight'),
            $height = document.getElementById('form_imc_height'),
            $age = document.getElementById('form_imc_age'),
            $sex = document.getElementById('form_imc_sex'),
            $result_tmr = document.querySelectorAll('.form_imc_result_tmr'),
            $result_imc = document.getElementById('form_imc_result_imc');

        function onchange() {
            var _weight = parseFloat($weight.value, 10),
                _height = parseFloat($height.value, 10),
                _age = parseFloat($age.value, 10),
                _sex = $sex.value,
                _result_tmr,
                _result_imc = _weight * 1000000 / (_height * _height);

            if (_sex == 'man') {
                _result_tmr = 13.397 * _weight + 4.799 * _height - 5.677 * _age + 88.362;
            }
            else {
                _result_tmr = 9.247 * _weight + 3.098 * _height - 4.330 * _age + 447.593;
            }

            /* IMC */
            $result_imc.innerHTML = Math.floor(_result_imc) / 100;
            $result_tmr.innerHTML = Math.floor(_result_tmr);

            Array.prototype.forEach.call($result_tmr, function(el){
                var multi = parseFloat(el.getAttribute('data-multi'));
                el.innerHTML = Math.floor(_result_tmr * multi);

            });
        }

        var _events = ['keyup', 'click', 'change'];
        for (var i = 0, len = _events.length; i < len; i++) {
            $age.addEventListener(_events[i], onchange, 1);
            $sex.addEventListener(_events[i], onchange, 1);
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
            $vo2max = document.getElementById('form_vma_vo2max'),

            _ratios = [{
                    'name': 'aero',
                    'distance': 1,
                    'ratio': 1
                }, {
                    'name': '5k',
                    'distance': 5,
                    'ratio': 0.94
                }, {
                    'name': '10k',
                    'distance': 10,
                    'ratio': 0.92
                }, {
                    'name': 'semi',
                    'distance': 21.1,
                    'ratio': 0.86
                }, {
                    'name': 'marathon',
                    'distance': 42.195,
                    'ratio': 0.82
                }

            ];

        function onchange(e) {
            var $field = e.target;

            if (!$field) {
                return;
            }

            var _vma = parseFloat($vma.value, 10),
                _vo2max = parseFloat($vo2max.value, 10),
                _value = parseFloat($field.value.replace(',', '.'));

            if (!_value) {
                return;
            }

            if ($field.getAttribute('name') == 'form_vma_vma') {
                $vo2max.value = (_value * 3.5).toFixed(2);
            }
            if ($field.getAttribute('name') == 'form_vma_vo2max') {
                $vma.value = (_value / 3.5).toFixed(2);
            }

            var _vma_value = parseFloat($vma.value);
            var _speed = 60 / _vma_value;

            var _percent_vma,
                _speed_tmp,
                _id;
            for (var i = 0, len = _ratios.length; i < len; i++) {
                _speed_tmp = _vma_value * _ratios[i].ratio;
                _percent_vma = _speed / _ratios[i].ratio;
                _id = 'form_vma_result_' + _ratios[i].name;
                document.getElementById(_id).innerHTML = speed_to_minutes(_percent_vma);
                if (document.getElementById(_id + '_speed')) {
                    document.getElementById(_id + '_speed').innerHTML = (_speed_tmp).toFixed(2);
                }
                if (document.getElementById(_id + '_duration')) {
                    document.getElementById(_id + '_duration').innerHTML = speed_to_minutes(_percent_vma * _ratios[i].distance);
                }
            }
        }

        var _events = ['blur', 'keyup'];
        for (var i = 0, len = _events.length; i < len; i++) {
            $vma.addEventListener(_events[i], onchange, 1);
            $vo2max.addEventListener(_events[i], onchange, 1);
        }

        $vo2max.dispatchEvent(new Event('blur'));

    }());

});
