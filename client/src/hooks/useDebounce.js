import { useEffect, useState, useRef } from 'react';

export function useDebounce(value, time) {
    const [_value, setValue] = useState(value);
    const mountedRef = useRef(false);
    const timeRef = useRef(null);

    const cancel = () => window.clearTimeout(timeRef.current);

    useEffect(() => {
        cancel();
        timeRef.current = window.setTimeout(() => {
            setValue(value);
        }, time);
        // eslint-disable-next-line
    }, [value]);

    useEffect(() => {
        mountedRef.current = true;
        return cancel;
    }, []);

    return [_value, cancel];
}