export function practice() {
    // let inputText;
    const input = document.querySelector("input");
    const defaultText = document.getElementById("default");
    const debounceText = document.getElementById("debounce");
    const throttleText = document.getElementById("throttle");

    const setDefault = setDefaultText(
        (text) => (defaultText.textContent = text)
    );

    const setDebounce = setDebounceText(
        (text) => (debounceText.textContent = text)
    );

    const setThrottle = setThrottleText((text) => {
        throttleText.textContent = text;
    });

    input?.addEventListener("input", (e) => {
        setDefault(e.target.value);
        setDebounce(e.target.value);
        setThrottle(e.target.value);
    });
}

function setDefaultText(fn) {
    return (...arg) => fn(arg);
}

function setDebounceText(fn, delay = 1000) {
    let timeout;
    return function (...arg) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...arg), delay);
    };
}

function setThrottleText(fn, delay = 1000) {
    let wantToWait = false;
    let waitingArgs;
    function timeoutFn(args) {
        if (waitingArgs === null) {
            wantToWait = false;
        } else {
            fn(...args);
            waitingArgs = null;
            setTimeout(timeoutFn, delay);
        }
    }

    return function (...args) {
        if (wantToWait) {
            waitingArgs = args;
            return;
        }
        fn(...args);
        wantToWait = true;

        setTimeout(() => {
            timeoutFn(args);
        }, delay);
    };
}
