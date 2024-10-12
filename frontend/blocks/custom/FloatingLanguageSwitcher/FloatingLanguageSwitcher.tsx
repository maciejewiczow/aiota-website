'use client';

import cx from 'classnames';
import { BlockComponent } from '~/blocks/types';
import { InternalLink } from '~/components/InternalLink';
import { useAvailableTranslations } from '~/context/AvailableTranslations';
import { interleaveArrays } from '~/utils/interleaveArrays';
import classes from './FloatingLanguageSwitcher.module.css';

export const FloatingLanguageSwitcher: BlockComponent<
    'CustomFloatingLanguageSwitcher'
> = ({ block: { attributes } }) => {
    const availableTranslations = useAvailableTranslations();

    return (
        <ul
            className={cx(classes.root, {
                [classes.topLeft]: attributes?.corner === 'top-left',
                [classes.topRight]: attributes?.corner === 'top-right',
                [classes.bottomRight]: attributes?.corner === 'bottom-right',
                [classes.bottomLeft]: attributes?.corner === 'bottom-left',
            })}
        >
            {interleaveArrays(
                availableTranslations.map(
                    ({ isCurrent, languageCode, uri }) => (
                        <li key={languageCode}>
                            <InternalLink
                                href={uri}
                                hoverUnderline
                                className={cx(isCurrent && classes.linkCurrent)}
                            >
                                {languageCode}
                            </InternalLink>
                        </li>
                    ),
                ),
                availableTranslations.map(({ languageCode }) => (
                    <li key={languageCode + 'separator'}>·</li>
                )),
            ).slice(0, -1)}
        </ul>
    );
};
