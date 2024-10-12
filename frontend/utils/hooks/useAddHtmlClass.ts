import { useEffect } from 'react';

export const useAddHtmlClass = (
    className: string | false | undefined | null,
) => {
    useEffect(() => {
        if (className) {
            document.getElementsByTagName('html')[0].classList.add(className);
        }

        return () => {
            if (className) {
                document
                    .getElementsByTagName('html')[0]
                    .classList.remove(className);
            }
        };
    }, [className]);
};
