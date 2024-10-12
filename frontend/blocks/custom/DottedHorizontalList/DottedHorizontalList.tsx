import { BlockComponent } from '~/blocks/types';
import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import { interleaveArrays } from '~/utils/interleaveArrays';
import classes from './DottedHorizontalList.module.css';

export const DottedHorizontalList: BlockComponent<
    'CustomDottedHorizontalList'
> = ({ block: { innerBlocks } }) => (
    <ul className={classes.root}>
        {interleaveArrays(
            (innerBlocks ?? []).map(block => (
                <li key={block.clientId}>
                    <WordPressBlockViewer blocks={[block]} />
                </li>
            )),
            // eslint-disable-next-line react/no-array-index-key
            innerBlocks?.map((_, i) => <li key={i}>·</li>) ?? [],
        ).slice(0, -1)}
    </ul>
);
