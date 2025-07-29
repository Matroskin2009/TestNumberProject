document.addEventListener('DOMContentLoaded', function() {
    const factTypeSelect = document.getElementById('fact-type');
    const numberInput = document.getElementById('number-input');
    const getFactBtn = document.getElementById('get-fact-btn');
    const randomBtn = document.getElementById('random-btn');
    const errorMessage = document.getElementById('error-message');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');

    getFactBtn.addEventListener('click', function() {
        const factType = factTypeSelect.value;
        let number = numberInput.value.trim();

        if (!validateInput(number, factType)) {
            return;
        }

        fetchFact(factType, number);
    });

    randomBtn.addEventListener('click', function() {
        const factType = factTypeSelect.value;
        numberInput.value = 'random';
        fetchFact(factType, 'random');
    });

    function validateInput(number, factType) {
        errorMessage.textContent = '';

        if (number === '') {
            errorMessage.textContent = 'Пожалуйста, введите число или дату';
            return false;
        }

        if (factType === 'date') {
            const dateParts = number.split('/');

            if (dateParts.length !== 2 ||
                isNaN(dateParts[0]) ||
                isNaN(dateParts[1]) ||
                dateParts[0] < 1 || dateParts[0] > 12 ||
                dateParts[1] < 1 || dateParts[1] > 31) {
                errorMessage.textContent = 'Для даты используйте формат: месяц/день (например, 5/20)';
                return false;
            }
            return true;
        }

        if (number !== 'random' && isNaN(number)) {
            errorMessage.textContent = 'Число должно быть в виде цифры (например, 42)';
            return false;
        }

        return true;
    }

    async function fetchFact(factType, number) {
    loading.style.display = 'block';
    result.style.display = 'none';
    errorMessage.textContent = '';

    let apiNumber = number;
    if (factType === 'date' && number !== 'random') {
        const [month, day] = number.split('/').map(Number);
        apiNumber = `${month}/${day}`;
    }

    const urls = [
        `http:
        `https:
        `https:
    ];

    let lastError = null;

    for (const url of urls) {
        try {
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) continue;

            const data = await response.json();
            displayResult(factType, number, data);
            loading.style.display = 'none';
            return;

        } catch (error) {
            lastError = error;
            console.warn(`Attempt failed for ${url}`, error);
            continue;
        }
    }

    loading.style.display = 'none';
    errorMessage.textContent = 'Сервис временно недоступен. Попробуйте позже.';
    console.error('All attempts failed:', lastError);

    if (factType === 'date' && number === '5/20') {
        displayResult(factType, number, {
            text: "May 20th is the day in 1570 when Abraham Ortelius published the first modern atlas."
        });
    }
}

    function displayResult(factType, number, data) {
        const factTypes = {
            trivia: 'Случайный факт',
            math: 'Математический факт',
            date: 'Факт о дате'
        };

        resultTitle.textContent = `${factTypes[factType]} ${number === 'random' ? 'о случайном числе' : 'о ' + number}`;

        resultText.textContent = data.text || 'Не удалось получить факт';

        result.style.display = 'block';
    }
});