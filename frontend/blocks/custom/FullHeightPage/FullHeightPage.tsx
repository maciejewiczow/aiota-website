'use client';

import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BlockComponent } from '~/blocks/types';
import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import { useAddHtmlClass } from '~/utils/hooks/useAddHtmlClass';
import classes from './FullHeightPage.module.css';

export const FullHeightPage: BlockComponent<'CustomFullHeightPage'> = ({
    block,
}) => {
    const theme = useMantineTheme();
    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

    useAddHtmlClass(
        (isDesktop || !block.attributes?.allowScrollOnMobile) &&
            classes.noScroll,
    );

    return (
        <main className={classes.root}>
            <WordPressBlockViewer blocks={block.innerBlocks} />
        </main>
    );
};
