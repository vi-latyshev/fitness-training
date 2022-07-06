import { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { setRef } from './setRef';

interface PortalProps {
    children?: React.ReactNode;
}

export const Portal = forwardRef(({ children }: PortalProps, ref) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setContainer(document.body);
    }, []);

    useEffect(() => {
        if (!container) {
            return undefined;
        }
        setRef(ref, container);

        return () => {
            setRef(ref, null);
        };
    }, [ref, container]);

    return container ? createPortal(children, container) : container;
});
