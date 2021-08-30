'use strict';


/**
 * Перевод римского числа в десятичное.
 * @function romanToArabic
 * @param {string} num - Римское число
 * @returns {number} - Десятичное число
 */
const romanToArabic = (num) => {
    if (typeof num !== 'string') {
        throw new TypeError('Type of num should be string!');
    }

    num = num.toUpperCase();
    // соответствие между римскими и арабскими числами
    const rom2arab = new Map([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000] 
    ]);
    let result = 0;
    if (!rom2arab.has(num[0])) {
        throw new SyntaxError('Invalid character at 1 position!');
    }
    for (let i = 1; i < num.length; ++i) {
        if (!rom2arab.has(num[i])) {
            throw new SyntaxError(`Invalid character at ${i + 1} position!`);
        }

        const cur_num = rom2arab.get(num[i - 1]);
        result += cur_num < rom2arab.get(num[i]) ? -cur_num : cur_num;
    }
    return result + rom2arab.get(num[num.length - 1]);
}


/**
 * Перевод десятичного числа в римское.
 * @function romanToArabic
 * @param {num} num - Десятичное число
 * @returns {string} - Римское число
 */
const arabicToRoman = (num) => {
    if (typeof num !== 'number') {
        throw new TypeError('Type of num should be number!');
    }

    // согласно правилу шварцмана
    if (num < 1 || num > 3999) {
        throw new SyntaxError('Invalid number!');
    }

    // соответствие между арабскими и римскими числами
    const arab2rom = new Map([
        [1000, 'M'],
        [900,  'CM'],
        [500,  'D'],
        [400,  'CD'],
        [100,  'C'],
        [90,   'XC'],
        [50,   'L'],
        [40,   'XL'],
        [10,   'X'],
        [9,    'IX'],
        [5,    'V'],
        [4,    'IV'],
        [1,    'I']
    ]);
    
    let result = '';

    arab2rom.forEach((value, key) => {
        const count = Math.floor(num / key);
        for (let i = 0; i < count; ++i) {
            result += value;
        }
        num %= key;
    });

    return result;
}


/**
 * Делегирует перевод чисел из десятичного (римского) формата в римский (десятичный).
 * @function roman
 * @param {(string|number)} input - Римское|десятичное число
 * @returns {(number|string)} - Десятичное|римское число
 */
const roman = (input) => {
    if (typeof input === 'string') {
        if (isNaN(Number(input))) {
            return romanToArabic(input);
        }
        else {
            return arabicToRoman(Number(input));
        }
    }
    else if (typeof input === 'number') {
        return arabicToRoman(input);
    }
    else {
        throw new TypeError('Type of input should be string or number!');
    }
}
