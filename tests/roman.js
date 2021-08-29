'use strict';

QUnit.module('Тестируем функцию roman', function () {
	QUnit.test('roman правильно переводит из римской системы счисления', function (assert) {
		assert.strictEqual(roman('I'), 1);
		assert.strictEqual(roman('V'), 5);
		assert.strictEqual(roman('M'), 1000);
		assert.strictEqual(roman('l'), 50);
		assert.strictEqual(roman('d'), 500);

		assert.strictEqual(roman('iv'), 4);
		assert.strictEqual(roman('iiii'), 4);
		assert.strictEqual(roman('CM'), 900);

		assert.strictEqual(roman('MCMIV'), 1904);
		assert.strictEqual(roman('MCMXC'), 1990);
		assert.strictEqual(roman('mmxvii'), 2017);

		// максимальное число согласно правилу Шварцмана
		assert.strictEqual(roman('MMMCMXCIX'), 3999);
	});

	QUnit.test('roman правильно переводит из десятичной системы счисления', function (assert) {
		assert.strictEqual(roman(1), 'I');
		assert.strictEqual(roman(5), 'V');
		assert.strictEqual(roman(1000), 'M');
		assert.strictEqual(roman(50), 'L');
		assert.strictEqual(roman(500), 'D');

		assert.strictEqual(roman(4), 'IV');
		assert.strictEqual(roman(900), 'CM');

		assert.strictEqual(roman(1904), 'MCMIV');
		assert.strictEqual(roman(1990), 'MCMXC');
		assert.strictEqual(roman(2017), 'MMXVII');

		// максимальное число согласно правилу Шварцмана
		assert.strictEqual(roman(3999), 'MMMCMXCIX');
	});

	QUnit.test('roman правильно определяет, что было передано на вход', function (assert) {
		assert.strictEqual(roman('1904'), 'MCMIV');
		assert.strictEqual(roman('1990'), 'MCMXC');
		assert.strictEqual(roman('2017'), 'MMXVII');
	});

	QUnit.test('roman бросает исключения при неверном типе переданных данных', function (assert) {
		let val1 = new Map();
		assert.throws(function() { roman(val); }, 'Error thrown');

		assert.throws(function() { roman(['III', 'V', 'CX']); }, 'Error thrown');
		assert.throws(function() { roman(); }, 'Error thrown');
	});

	QUnit.test('roman бросает исключения при неверных числах', function (assert) {
		assert.throws(function() { roman('12z'); }, 'Error thrown');
		assert.throws(function() { roman('!!!'); }, 'Error thrown');
		assert.throws(function() { roman('MC&I'); }, 'Error thrown');
		assert.throws(function() { roman(''); }, 'Error thrown');

		// тестирование ограничений
		assert.throws(function() { roman(-5); }, 'The number is less than the minimum');
		assert.throws(function() { roman(123456); }, 'The number is greater than the maximum');
	});
});
