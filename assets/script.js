/* ----------------------------------------------------------
  Local storage
---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    Array.prototype.forEach.call(document.querySelectorAll('[data-jsu-local-storage]'), function(el) {
        var el_key = 'data_jsu_' + el.getAttribute('name');

        /* Initial value */
        set_value(el, localStorage.getItem(el_key));

        /* Watch changes */
        el.addEventListener('change', function() {
            localStorage.setItem(el_key, el.value);
        });
    });

    function set_value(el, initial_value) {
        if (!initial_value) {
            return;
        }
        if (el.tagName == 'SELECT' && !option_exists(el, initial_value)) {
            return;
        }
        el.value = initial_value;
    }

    function option_exists($select, value) {
        for (var i = 0; i < $select.options.length; i++) {
            if ($select.options[i].value == value) {
                return true;
            }
        }
        return false;
    }
});

/* ----------------------------------------------------------
  Values
---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    function update_el_value(el, value) {
        var multi = parseFloat(el.getAttribute('data-multi'));
        if (!multi) {
            multi = 1;
        }
        var divi = parseFloat(el.getAttribute('data-divi'));
        if (!divi) {
            divi = 1;
        }
        var deci = parseFloat(el.getAttribute('data-deci'));
        if (!deci) {
            deci = 0;
        }

        value = (value * multi / divi).toFixed(deci);
        el.innerHTML = value;
    }

    (function() {
        var $weight = document.getElementById('form_imc_weight'),
            $height = document.getElementById('form_imc_height'),
            $profil = document.getElementById('form_imc_profil'),
            $morphologie = document.getElementById('form_imc_morphologie'),
            $age = document.getElementById('form_imc_age'),
            $deficit = document.getElementById('form_imc_deficit'),
            $sex = document.getElementById('form_imc_sex'),
            $result_weight = document.querySelectorAll('.form_imc_result_weight'),
            $result_tmr_base = document.querySelectorAll('.form_imc_result_tmr_base'),
            $result_tmr = document.querySelectorAll('.form_imc_result_tmr'),
            $result_tmr_deficit = document.querySelectorAll('.form_imc_result_tmr_deficit'),
            $result_kcal_def = document.querySelectorAll('.form_imc_result_kcal_def'),
            $result_imc = document.getElementById('form_imc_result_imc'),
            $result_broca = document.querySelectorAll('.form_imc_result_broca'),
            $result_lorentz = document.querySelectorAll('.form_imc_result_lorentz'),
            $result_creff = document.querySelectorAll('.form_imc_result_creff');

        function onchange() {
            var _weight = parseFloat($weight.value, 10),
                _height = parseFloat($height.value, 10),
                _age = parseFloat($age.value, 10),
                _sex = $sex.value,
                _morphologie = parseFloat($morphologie.value),
                _deficit = parseFloat($deficit.value),
                _result_broca,
                _result_lorentz,
                _result_creff,
                _result_tmr_base,
                _result_tmr,
                _result_tmr_deficit,
                _result_imc = _weight * 1000000 / (_height * _height);

            if (!_deficit) {
                _deficit = 0;
            }

            _result_creff = (_height - 100 + _age / 10) * _morphologie;
            if (_sex == 'man') {
                _result_lorentz = _height - 100 - ((_height - 150) / 4);
                _result_tmr = 13.397 * _weight + 4.799 * _height - 5.677 * _age + 88.362;
            }
            else {
                _result_lorentz = _height - 100 - ((_height - 150) / 2.5);
                _result_tmr = 9.247 * _weight + 3.098 * _height - 4.330 * _age + 447.593;
            }

            _result_broca = _height - 100;
            _result_tmr_base = _result_tmr;
            _result_tmr *= parseFloat($profil.value);
            _result_tmr_deficit = _result_tmr + _deficit;

            /* IMC */
            $result_imc.innerHTML = Math.floor(_result_imc) / 100;

            /* TMR */
            Array.prototype.forEach.call($result_tmr, function(el) {
                update_el_value(el, _result_tmr);
            });
            Array.prototype.forEach.call($result_tmr_base, function(el) {
                update_el_value(el, _result_tmr_base);
            });
            Array.prototype.forEach.call($result_tmr_deficit, function(el) {
                update_el_value(el, _result_tmr_deficit);
            });
            Array.prototype.forEach.call($result_kcal_def, function(el) {
                update_el_value(el, _deficit);
            });
            Array.prototype.forEach.call($result_weight, function(el) {
                update_el_value(el, _weight);
            });
            Array.prototype.forEach.call($result_broca, function(el) {
                update_el_value(el, _result_broca);
            });
            Array.prototype.forEach.call($result_creff, function(el) {
                update_el_value(el, _result_creff);
            });
            Array.prototype.forEach.call($result_lorentz, function(el) {
                update_el_value(el, _result_lorentz);
            });
        }

        var _events = ['keyup', 'click', 'change'];
        for (var i = 0, len = _events.length; i < len; i++) {
            $age.addEventListener(_events[i], onchange, 1);
            $sex.addEventListener(_events[i], onchange, 1);
            $morphologie.addEventListener(_events[i], onchange, 1);
            $weight.addEventListener(_events[i], onchange, 1);
            $height.addEventListener(_events[i], onchange, 1);
            $profil.addEventListener(_events[i], onchange, 1);
            $deficit.addEventListener(_events[i], onchange, 1);
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
