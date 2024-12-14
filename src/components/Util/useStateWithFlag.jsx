import { useState } from 'react';

function useStateWithFlag(initialValue, flagSetter) {
    const [state, setState] = useState(initialValue);

    const setCustomState = (newValue) => {
        setState(newValue);
        if (typeof flagSetter === 'function') {
            flagSetter(true);
        }
    };

    return [state, setCustomState];
}

export default useStateWithFlag;