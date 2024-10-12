import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import { BlockComponent } from './types';

export const Fallback: BlockComponent = ({ block }) => ((block.innerBlocks?.length ?? 0) > 0 ? (
        <WordPressBlockViewer blocks={block.innerBlocks ?? []} />
    ) : (
        <div dangerouslySetInnerHTML={{ __html: block?.renderedHtml ?? '' }} />
    ));
