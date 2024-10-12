import { EditorBlock } from '~/api/queries/getEditorBlocks';
import { BlockMap } from '~/blocks/types';

export const getComponentForBlock = (
    blockMap: BlockMap,
    editorBlock: Pick<EditorBlock, '__typename'>,
) => blockMap[editorBlock.__typename];
