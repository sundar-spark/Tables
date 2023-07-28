export function memoize(func) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.hasOwnProperty(key)) {
            return cache[key];
        } else {
            const result = func.apply(this, args);
            cache[key] = result;
            return result;
        }
    };
}
