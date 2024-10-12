import { BlockComponent } from '~/blocks/types';
import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import classes from './ErrorPageLayout.module.css';

export const ErrorPageLayout: BlockComponent<'CustomErrorPageLayout'> = ({
    block,
}) => (
    <main className={classes.root}>
        <WordPressBlockViewer blocks={block.innerBlocks} />
    </main>
);
