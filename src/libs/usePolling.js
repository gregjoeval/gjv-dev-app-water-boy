import {useState, useEffect, useRef} from 'react';

/**
 * useInterval with some modifications for my use case
 * Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param {Function} callback -
 * @param {number} interval -
 * @param {number} limit -
 * @returns {void} -
 */
function usePolling(callback: Function, interval: number, limit?: number = null) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const tick = () => {
            savedCallback.current();
            setCount(x => x + 1);
        };

        if (!hasStarted) {
            setHasStarted(true);
            tick();
        }

        if (interval !== null && (!limit || count < limit)) {
            const id = window.setTimeout(tick, interval);
            return () => {
                window.clearTimeout(id);
            };
        }

        return () => {};
    }, [count, hasStarted, interval, limit]);
}

export default usePolling;
