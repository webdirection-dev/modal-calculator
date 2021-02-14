# module-calculator
Скрипт для калькулятора.


## Подключение модуля
В данном репозитории точкой входа ___Webpack___ является _./src/js/script.js_.
<br /> Импортируем в него модуль со скриптом слайдера:
```javascript
// Точка вхождения Webpack: "./src/js/script.js'
"use strict";

import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', () => {
    calculator();
});
```
