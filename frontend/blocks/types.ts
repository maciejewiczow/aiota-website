import { EditorBlock } from '~/api/queries/getEditorBlocks';
import { DataWithChildren } from '~/utils/flatListToHierarchical';

export type EditorBlockTree = DataWithChildren<EditorBlock>;

export interface BlockComponentProps<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends EditorBlockTree['__typename'] = any,
> {
    block: Extract<EditorBlockTree, { __typename: T }>;
}

export type BlockComponent<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends EditorBlockTree['__typename'] = any,
> = React.FC<BlockComponentProps<T>>;

export type BlockMap = Partial<
    Record<EditorBlockTree['__typename'], BlockComponent>
>;
