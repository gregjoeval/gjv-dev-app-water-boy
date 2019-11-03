
let polTimeoutId = null;
const stop = () => {
    if (polTimeoutId) {
        window.clearTimeout(polTimeoutId);
    }
};

const start = (fn, interval) => {
    stop();
    polTimeoutId = window.setTimeout(() => {
        fn();
        start(fn, interval);
    }, interval);
};

const Polling = {
    start,
    stop
};

export default Polling;
