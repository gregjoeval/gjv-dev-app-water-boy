// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useCallback, useRef} from 'react';

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
            if (!limit || count < limit) {
                savedCallback.current();
                setCount(x => x + 1);
            }
        };

        if (!hasStarted) {
            setHasStarted(true);
            tick();
        }

        if (interval !== null) {
            const id = window.setInterval(tick, interval);
            return () => {
                window.clearInterval(id);
            };
        }

        return () => {};
    }, [count, hasStarted, interval, limit]);
}

export default usePolling;
