// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useCallback} from 'react';

/**
 * useInterval with some modifications for my use case
 * Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param {Function} callback -
 * @param {number} interval -
 * @returns {void} -
 */
export function usePolling(callback: Function, interval: number) {
    const [hasStarted, setHasStarted] = useState(false);

    // set the callback once, on mount
    const cb = useCallback(callback, []);

    useEffect(() => {
        const tick = () => {
            cb();
        };

        if (!hasStarted) {
            setHasStarted(true);
            tick();
        }

        if (interval !== null) {
            const id = setInterval(tick, interval);
            return () => {
                clearInterval(id);
            };
        }

        return () => {};
    }, [cb, hasStarted, interval]);
}

export default usePolling;
