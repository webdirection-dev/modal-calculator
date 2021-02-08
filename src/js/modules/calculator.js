function calculator() {
    console.log('test');
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio = 1.375;

    // Получить инфу из localStorage
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', '1.375');
    }

    //Устанавливаем на кнопки выбора класс активности в зависимости от localStorage
    function initLocalSetting(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }

    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');
    initLocalSetting('#gender div', 'calculating__choose-item_active');

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return; // искусственно останавливаем выполнение функции, чтобы не загружать ресурсы
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio')); // LocalStorage
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }

                elements.forEach(item => {
                    item.classList.remove(activeClass);
                })

                event.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            // Сообщаем пользователю о неверных введенных данных
            if (input.value.match(/\D/g)) {
                input.style.border = 'solid 1px red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calculator;