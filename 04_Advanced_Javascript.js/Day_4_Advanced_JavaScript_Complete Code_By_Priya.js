// ============================================
// Advanced JavaScript Guide - Complete Fixed Version
// ============================================

'use strict';

console.log('🎯 Advanced JavaScript Guide - All Examples');
console.log('='.repeat(60));

// ============================
// 1. Advanced Functions
// ============================

console.log('\n\n=== 1. ADVANCED FUNCTIONS ===');
console.log('-'.repeat(40));

// Higher-Order Functions
console.log('\n🔹 Higher-Order Functions:');
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const add2 = x => x + 2;
const multiply3 = x => x * 3;
console.log('Function Composition:', compose(multiply3, add2)(5));

// Memoization
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('✓ Cache hit');
            return cache.get(key);
        }
        console.log('✗ Cache miss');
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

const expensiveCalc = memoize((n) => {
    let result = 0;
    for (let i = 0; i < n * 1000; i++) {
        result += Math.random();
    }
    return result;
});

console.log('First call:', expensiveCalc(5).toFixed(2));
console.log('Second call (cached):', expensiveCalc(5).toFixed(2));

// ============================
// 2. Closures & Currying
// ============================

console.log('\n\n=== 2. CLOSURES & CURRYING ===');
console.log('-'.repeat(40));

// Module Pattern
const Counter = (function() {
    let count = 0;
    return {
        increment() { count++; return this; },
        decrement() { count--; return this; },
        getValue() { return count; }
    };
})();

Counter.increment().increment().increment();
console.log('Counter after 3 increments:', Counter.getValue());

// Currying
const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) return fn(...args);
        return (...moreArgs) => curried(...args, ...moreArgs);
    };
};

const addThree = curry((a, b, c) => a + b + c);
console.log('Curried addition:', addThree(1)(2)(3));

// ============================
// 3. Prototypes & Inheritance
// ============================

console.log('\n\n=== 3. PROTOTYPES & INHERITANCE ===');
console.log('-'.repeat(40));

class Animal {
    constructor(name) { this.name = name; }
    speak() { console.log(`${this.name} makes noise`); }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    bark() { console.log(`${this.name} barks!`); }
}

const dog = new Dog('Rex', 'Labrador');
console.log('Created:', dog.name, 'the', dog.breed);
dog.speak();
dog.bark();

// ============================
// 4. Advanced Arrays
// ============================

console.log('\n\n=== 4. ADVANCED ARRAYS ===');
console.log('-'.repeat(40));

const numbers = [1, 2, 3, 4, 5];
console.log('Original:', numbers);
console.log('Map (x2):', numbers.map(n => n * 2));
console.log('Filter (>2):', numbers.filter(n => n > 2));
console.log('Reduce (sum):', numbers.reduce((a, b) => a + b, 0));

// Array.from()
const arrayLike = {0: 'a', 1: 'b', 2: 'c', length: 3};
console.log('Array.from():', Array.from(arrayLike));

// ============================
// 5. Advanced Objects (FIXED)
// ============================

console.log('\n\n=== 5. ADVANCED OBJECTS ===');
console.log('-'.repeat(40));

// Property Descriptors - with error handling
console.log('🔹 Property Descriptors:');
const obj = {};
Object.defineProperty(obj, 'readOnly', {
    value: 'Original Value',
    writable: false
});

console.log('Created read-only property:', obj.readOnly);

// Try to change - will fail in strict mode
try {
    obj.readOnly = 'New Value';
} catch (error) {
    console.log('Cannot change read-only property (expected error)');
}
console.log('Value unchanged:', obj.readOnly);

// Proxy
console.log('\n🔹 Proxy Objects:');
const target = { balance: 100 };
const proxy = new Proxy(target, {
    get(obj, prop) {
        console.log(`Reading ${prop}: ${obj[prop]}`);
        return obj[prop];
    },
    set(obj, prop, value) {
        if (prop === 'balance' && value < 0) {
            console.log('Cannot set negative balance');
            return false;
        }
        console.log(`Setting ${prop} = ${value}`);
        obj[prop] = value;
        return true;
    }
});

console.log('Initial balance:', proxy.balance);
proxy.balance = 150;
console.log('New balance:', proxy.balance);

// ============================
// 6. Regular Expressions
// ============================

console.log('\n\n=== 6. REGULAR EXPRESSIONS ===');
console.log('-'.repeat(40));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log('Email validation:');
console.log('test@example.com:', emailRegex.test('test@example.com'));
console.log('invalid@email:', emailRegex.test('invalid@email'));

// ============================
// 7. Error Handling
// ============================

console.log('\n\n=== 7. ERROR HANDLING ===');
console.log('-'.repeat(40));

class AppError extends Error {
    constructor(message, code = 500) {
        super(message);
        this.code = code;
        this.timestamp = new Date().toISOString();
    }
}

try {
    throw new AppError('Test error', 400);
} catch (error) {
    console.log('Caught error:', error.message);
    console.log('Error code:', error.code);
}

// ============================
// 8. Asynchronous JavaScript
// ============================

console.log('\n\n=== 8. ASYNCHRONOUS JAVASCRIPT ===');
console.log('-'.repeat(40));

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    console.log('Starting async operation...');
    await delay(100);
    console.log('Async operation completed!');
})();

// ============================
// 9. DOM Manipulation (Simulated)
// ============================

console.log('\n\n=== 9. DOM MANIPULATION ===');
console.log('-'.repeat(40));

console.log('Simulating DOM creation...');
const mockElement = {
    tagName: 'div',
    innerHTML: '<h1>Hello</h1>',
    style: { color: 'blue' }
};
console.log('Created element:', mockElement);

// ============================
// 10. Browser APIs (Simulated)
// ============================

console.log('\n\n=== 10. BROWSER APIS ===');
console.log('-'.repeat(40));

console.log('Simulating localStorage...');
const mockStorage = {};
mockStorage['user'] = JSON.stringify({name: 'John'});
console.log('Stored user:', JSON.parse(mockStorage['user']));

// ============================
// 11. Performance Optimization
// ============================

console.log('\n\n=== 11. PERFORMANCE ===');
console.log('-'.repeat(40));

// Debounce
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

console.log('Debounce function created');

// ============================
// 12. Design Patterns
// ============================

console.log('\n\n=== 12. DESIGN PATTERNS ===');
console.log('-'.repeat(40));

// Singleton
const Singleton = (() => {
    let instance;
    return {
        getInstance: () => {
            if (!instance) instance = {id: Date.now()};
            return instance;
        }
    };
})();

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log('Singleton same instance?', s1 === s2);

// ============================
// 13. Modern JavaScript
// ============================

console.log('\n\n=== 13. MODERN JAVASCRIPT ===');
console.log('-'.repeat(40));

// Optional Chaining
const user = {
    profile: { name: 'John' }
};
console.log('User city:', user?.profile?.address?.city ?? 'Unknown');

// Private fields
class BankAccount {
    #balance = 0;
    deposit(amount) { this.#balance += amount; }
    getBalance() { return this.#balance; }
}

const account = new BankAccount();
account.deposit(100);
console.log('Bank balance:', account.getBalance());

// ============================
// 14. Architecture
// ============================

console.log('\n\n=== 14. ARCHITECTURE ===');
console.log('-'.repeat(40));

// Module pattern
const ApiClient = {
    get: url => Promise.resolve(`Data from ${url}`),
    post: (url, data) => Promise.resolve(`Posted to ${url}`)
};

console.log('ApiClient module created');

// ============================
// 15. Exercises
// ============================

console.log('\n\n=== 15. EXERCISES ===');
console.log('-'.repeat(40));

console.log(`
🎯 Exercise 1: State Management Library
🎯 Exercise 2: Form Builder
🎯 Exercise 3: Chat Application
🎯 Exercise 4: Dashboard
🎯 Final: E-commerce Platform
`);

// ============================
// 16. Quiz Answers
// ============================

console.log('\n=== 16. QUIZ ANSWERS ===');
console.log('-'.repeat(40));

console.log('1. a) Temporal Dead Zone');
console.log('2. c) Module pattern');
console.log('3. c) Both a and b');
console.log('4. c) Memory optimization');
console.log('5. b) Make objects iterable');

// ============================
// CONCLUSION
// ============================

console.log('\n\n' + '='.repeat(60));
console.log('🎉 CONGRATULATIONS!');
console.log('='.repeat(60));
console.log('\nAll 14 sections completed successfully!');
console.log('\n📚 What you learned:');
console.log('   ✓ Advanced Functions & Closures');
console.log('   ✓ Prototypes & ES6 Classes');
console.log('   ✓ Arrays, Objects, Regex');
console.log('   ✓ Error Handling & Async/Await');
console.log('   ✓ Design Patterns & Modern JS');
console.log('\nKeep practicing and building projects! 🚀\n');

// Export for module system (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        compose,
        memoize,
        curry,
        Counter,
        StorageManager,
        ApiClient,
        Formatter,
        Validator,
        Container
    };
}