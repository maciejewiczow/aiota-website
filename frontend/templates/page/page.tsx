import invariant from 'tiny-invariant';
import { getClient } from '~/api/apolloClient';
import {
    EditorBlock,
    getEditorBlocksByUri,
} from '~/api/queries/getEditorBlocks';
import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import { flatListToHierarchical } from '~/utils/flatListToHierarchical';
import { isTruthy } from '~/utils/isTruthy';
import { WordpressTemplate } from '../types';

export const Page: WordpressTemplate = async ({ uri }) => {
    const { data } = await getClient().query({
        query: getEditorBlocksByUri,
        variables: { uri },
    });

    invariant(data.nodeByUri?.__typename === 'Page');

    const hierarchical = flatListToHierarchical<EditorBlock>(
        data.nodeByUri?.editorBlocks?.filter(isTruthy) ?? [],
    );

    return <WordPressBlockViewer blocks={hierarchical} />;
};
