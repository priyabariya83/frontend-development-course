// ========================================================
// DAY 4: ADVANCED JAVASCRIPT - COMPLETE GUIDE
// ========================================================

console.log("🎯 Advanced JavaScript Guide - All Examples");
console.log("=".repeat(60) + "\n");

// ==================== 1. ADVANCED FUNCTIONS ====================
console.log("\n=== 1. ADVANCED FUNCTIONS ===\n" + "-".repeat(40));

// Higher-Order Functions
function compose(...fns) {
    return (x) => fns.reduceRight((v, f) => f(v), x);
}

const add2 = x => x + 2;
const multiply3 = x => x * 3;
const square = x => x * x;

const transform = compose(square, multiply3, add2);
console.log("🔹 Higher-Order Functions:");
console.log("Function Composition:", transform(5)); // ((5 + 2) * 3)^2 = 441

// Memoization
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("✓ Cache hit");
            return cache.get(key);
        }
        console.log("✗ Cache miss");
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalculation = memoize((n) => {
    let result = 0;
    for (let i = 0; i < n * 1000; i++) {
        result += Math.random();
    }
    return result.toFixed(2);
});

console.log("First call:", expensiveCalculation(100));
console.log("Second call (cached):", expensiveCalculation(100));

// ==================== 2. CLOSURES & CURRYING ====================
console.log("\n=== 2. CLOSURES & CURRYING ===\n" + "-".repeat(40));

// Module Pattern with Closure
const Counter = (function() {
    let count = 0;
    
    return {
        increment() {
            count++;
            return this;
        },
        decrement() {
            count--;
            return this;
        },
        getValue() {
            return count;
        }
    };
})();

Counter.increment().increment().increment();
console.log("Counter after 3 increments:", Counter.getValue());

// Currying
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log("Curried addition:", curriedAdd(1)(2)(3));

// ==================== 3. PROTOTYPES & INHERITANCE ====================
console.log("\n=== 3. PROTOTYPES & INHERITANCE ===\n" + "-".repeat(40));

// ES6 Classes
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} makes noise`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    
    speak() {
        super.speak();
        console.log(`${this.name} barks!`);
    }
    
    getInfo() {
        return `${this.name} the ${this.breed}`;
    }
}

const dog = new Dog("Rex", "Labrador");
console.log("Created:", dog.getInfo());
dog.speak();

// ==================== 4. ADVANCED ARRAYS ====================
console.log("\n=== 4. ADVANCED ARRAYS ===\n" + "-".repeat(40));

const numbers = [1, 2, 3, 4, 5];
console.log("Original:", numbers);
console.log("Map (x2):", numbers.map(n => n * 2));
console.log("Filter (>2):", numbers.filter(n => n > 2));
console.log("Reduce (sum):", numbers.reduce((sum, n) => sum + n, 0));

// Array.from() with mapping
const arrayLike = {0: 'a', 1: 'b', 2: 'c', length: 3};
console.log("Array.from():", Array.from(arrayLike));

// ==================== 5. ADVANCED OBJECTS ====================
console.log("\n=== 5. ADVANCED OBJECTS ===\n" + "-".repeat(40));

// Property Descriptors
const obj = {};
Object.defineProperty(obj, 'readOnlyProp', {
    value: 'Original Value',
    writable: false,
    enumerable: true
});

console.log("🔹 Property Descriptors:");
console.log("Created read-only property:", obj.readOnlyProp);
try {
    obj.readOnlyProp = 'New Value';
} catch (e) {
    console.log("Cannot change read-only property (expected error)");
}
console.log("Value unchanged:", obj.readOnlyProp);

// Proxy Objects
const target = { balance: 100 };
const handler = {
    get(obj, prop) {
        console.log(`Reading ${prop}: ${obj[prop]}`);
        return obj[prop];
    },
    set(obj, prop, value) {
        console.log(`Setting ${prop} = ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);
console.log("🔹 Proxy Objects:");
console.log("Initial balance:", proxy.balance);
proxy.balance = 150;
console.log("New balance:", proxy.balance);

// ==================== 6. REGULAR EXPRESSIONS ====================
console.log("\n=== 6. REGULAR EXPRESSIONS ===\n" + "-".repeat(40));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log("Email validation:");
console.log("test@example.com:", emailRegex.test("test@example.com"));
console.log("invalid@email:", emailRegex.test("invalid@email"));

// ==================== 7. ERROR HANDLING ====================
console.log("\n=== 7. ERROR HANDLING ===\n" + "-".repeat(40));

class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }
}

try {
    throw new AppError("Test error", 400);
} catch (error) {
    console.log("Caught error:", error.message);
    console.log("Error code:", error.code);
}

// ==================== 8. ASYNCHRONOUS JAVASCRIPT ====================
console.log("\n=== 8. ASYNCHRONOUS JAVASCRIPT ===\n" + "-".repeat(40));

async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "Async data received!" });
        }, 1000);
    });
}

console.log("Starting async operation...");
fetchData().then(result => {
    console.log("Async result:", result.data);
}).catch(err => {
    console.error("Async error:", err);
});

// ==================== 9. DOM MANIPULATION (Simulated) ====================
console.log("\n=== 9. DOM MANIPULATION ===\n" + "-".repeat(40));

// Simulating DOM operations
class VNode {
    constructor(tag, props = {}, children = []) {
        this.tag = tag;
        this.props = props;
        this.children = children;
    }
}

function createElement(tag, props, ...children) {
    return new VNode(tag, props, children);
}

const virtualDOM = createElement('div', 
    { style: { color: 'blue' } },
    createElement('h1', null, 'Hello')
);

console.log("Simulating DOM creation...");
console.log("Created element:", {
    tagName: virtualDOM.tag,
    innerHTML: '<h1>Hello</h1>',
    style: virtualDOM.props.style
});

// ==================== 10. STORAGE API ====================
console.log("\n=== 10. STORAGE API ===\n" + "-".repeat(40));

// Simple Storage Manager
class SimpleStorageManager {
    constructor(storage = localStorage) {
        this.storage = storage;
    }
    
    set(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }
    
    get(key, defaultValue = null) {
        const item = this.storage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    }
    
    remove(key) {
        this.storage.removeItem(key);
    }
    
    clear() {
        this.storage.clear();
    }
}

// Simulating localStorage (since we're in Node.js)
const mockStorage = {
    store: {},
    setItem(key, value) {
        this.store[key] = value;
    },
    getItem(key) {
        return this.store[key] || null;
    },
    removeItem(key) {
        delete this.store[key];
    },
    clear() {
        this.store = {};
    }
};

const storage = new SimpleStorageManager(mockStorage);
storage.set('user', { name: 'John', age: 25 });
console.log("Simulating localStorage...");
console.log("Stored user:", storage.get('user'));

// ==================== 11. PERFORMANCE ====================
console.log("\n=== 11. PERFORMANCE ===\n" + "-".repeat(40));

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedLog = debounce((msg) => {
    console.log("Debounced:", msg);
}, 300);

console.log("Debounce function created");
// In browser: debouncedLog("Hello after delay");

// ==================== 12. DESIGN PATTERNS ====================
console.log("\n=== 12. DESIGN PATTERNS ===\n" + "-".repeat(40));

// Singleton Pattern
const Singleton = (function() {
    let instance;
    
    function createInstance() {
        return { createdAt: new Date() };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log("Singleton same instance?", instance1 === instance2);

// ==================== 13. MODERN JAVASCRIPT ====================
console.log("\n=== 13. MODERN JAVASCRIPT ===\n" + "-".repeat(40));

// Optional Chaining & Nullish Coalescing
const user = {
    profile: {
        name: 'Alice'
    }
};

console.log("User city:", user?.profile?.address?.city ?? "Unknown");

// Private Class Fields (simulated for Node.js)
class BankAccount {
    #balance = 0;
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        this.#balance += amount;
    }
    
    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(100);
console.log("Bank balance:", account.getBalance());

// ==================== 14. MODULE PATTERN ====================
console.log("\n=== 14. ARCHITECTURE ===\n" + "-".repeat(40));

// Module Pattern
const ApiClient = (function() {
    let baseUrl = 'https://api.example.com';
    let token = null;
    
    function setToken(newToken) {
        token = newToken;
    }
    
    async function get(endpoint) {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Simulated API call
        return { data: `GET ${baseUrl}/${endpoint}` };
    }
    
    async function post(endpoint, data) {
        return { data: `POST ${baseUrl}/${endpoint}`, body: data };
    }
    
    return {
        setToken,
        get,
        post,
        setBaseUrl(url) {
            baseUrl = url;
        }
    };
})();

console.log("ApiClient module created");

// ==================== 15. EXERCISES ====================
console.log("\n=== 15. EXERCISES ===\n" + "-".repeat(40));

console.log("\n🎯 Exercise 1: State Management Library");
console.log("   Create Redux-like state management");
console.log("   - Store with reducers");
console.log("   - Middleware support");
console.log("   - Time travel debugging");

console.log("\n🎯 Exercise 2: Form Builder");
console.log("   Build dynamic form builder");
console.log("   - Various field types");
console.log("   - Validation rules");
console.log("   - Conditional fields");

console.log("\n🎯 Exercise 3: Chat Application");
console.log("   Real-time chat app");
console.log("   - WebSocket connections");
console.log("   - Message history");
console.log("   - User presence");

console.log("\n🎯 Exercise 4: Dashboard");
console.log("   Data visualization dashboard");
console.log("   - Multiple chart types");
console.log("   - Real-time updates");
console.log("   - Filtering capabilities");

console.log("\n🎯 Final: E-commerce Platform");
console.log("   Complete e-commerce app");
console.log("   - Product catalog");
console.log("   - Shopping cart");
console.log("   - Checkout process");
console.log("   - User accounts");

// ==================== 16. QUIZ ANSWERS ====================
console.log("\n=== 16. QUIZ ANSWERS ===\n" + "-".repeat(40));

console.log("1. a) Temporal Dead Zone");
console.log("2. c) Module pattern");
console.log("3. c) Both a and b");
console.log("4. c) Memory optimization");
console.log("5. b) Make objects iterable");

// ==================== FINAL MESSAGE ====================
console.log("\n" + "=".repeat(60));
console.log("🎉 CONGRATULATIONS!");
console.log("=".repeat(60));

console.log("\nAll 16 sections completed successfully!\n");

console.log("📚 What you learned:");
console.log("   ✓ Advanced Functions & Closures");
console.log("   ✓ Prototypes & ES6 Classes");
console.log("   ✓ Arrays, Objects, Regex");
console.log("   ✓ Error Handling & Async/Await");
console.log("   ✓ Design Patterns & Modern JS");
console.log("   ✓ DOM Manipulation & Storage APIs");
console.log("   ✓ Performance Optimization");
console.log("   ✓ Module Architecture");

console.log("\n🚀 Next Steps:");
console.log("   1. Practice with the exercises");
console.log("   2. Build the final project");
console.log("   3. Contribute to open source");
console.log("   4. Learn a framework (React/Vue/Angular)");

console.log("\nKeep coding and building amazing things! 💻✨\n");

// Wait for async operations to complete before exiting
setTimeout(() => {
    console.log("✅ All examples executed successfully!");
}, 1500);
