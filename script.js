function isPerfectNumber(num) {
    if (num <= 1) return false;
    
    let sumOfDivisors = 0;
    
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            sumOfDivisors += i;
        }
    }
    
    return sumOfDivisors === num;
}

function findPerfectNumbersInRange(min, max) {
    const perfectNumbers = [];
    
    for (let i = min; i <= max; i++) {
        if (isPerfectNumber(i)) {
            perfectNumbers.push(i);
        }
    }
    
    return perfectNumbers;
}

function getDivisors(num) {
    const divisors = [];
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            divisors.push(i);
        }
    }
    return divisors;
}

function checkSingleNumber() {
    const number = parseInt(document.getElementById('single-input').value);
    
    if (isNaN(number) || number <= 0) {
        document.getElementById('single-result').innerHTML = 
            '<p style="color: #ff6b6b;">Помилка: введіть додатне число</p>';
        return;
    }
    
    const isPerfect = isPerfectNumber(number);
    const divisors = getDivisors(number);
    const sumOfDivisors = divisors.reduce((sum, div) => sum + div, 0);
    
    document.getElementById('single-result').innerHTML = `
        <h3>Перевірка числа ${number}:</h3>
        <p><strong>Дільники:</strong> ${divisors.join(', ')}</p>
        <p><strong>Сума дільників:</strong> ${sumOfDivisors}</p>
        <p><strong>Результат:</strong> ${number} ${isPerfect ? 'є' : 'не є'} досконалим числом</p>
        ${isPerfect ? '<div class="perfect-number response-number">✅ Це досконале число!</div>' : '<div class="wrong-number response-number">❌️ Це не досконале число!</div>'}
    `;
}

function findInRange() {
    const min = parseInt(document.getElementById('min-input').value);
    const max = parseInt(document.getElementById('max-input').value);
    
    if (isNaN(min) || isNaN(max) || min <= 0 || max <= 0 || min > max) {
        document.getElementById('range-result').innerHTML = 
            '<p style="color: #ff6b6b;">Помилка: введіть коректний діапазон</p>';
        return;
    }
    
    const perfectNumbers = findPerfectNumbersInRange(min, max);
    
    let resultHTML = `<h3>Досконалі числа в діапазоні ${min} - ${max}:</h3>`;
    
    if (perfectNumbers.length === 0) {
        resultHTML += '<p>У цьому діапазоні немає досконалих чисел</p>';
    } else {
        resultHTML += `<p>Знайдено ${perfectNumbers.length} досконалих чисел:</p>`;
        perfectNumbers.forEach(num => {
            const divisors = getDivisors(num);
            resultHTML += `
                <div class="perfect-number">
                    <strong>${num}</strong> = ${divisors.join(' + ')} = ${divisors.reduce((sum, div) => sum + div, 0)}
                </div>
            `;
        });
    }
    
    document.getElementById('range-result').innerHTML = resultHTML;
}
