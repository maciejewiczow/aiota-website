import { EditorBlock } from '~/api/queries/getEditorBlocks';
import { DataWithChildren } from './flatListToHierarchical';

export const getLayoutSlotByAreaId = (
    innerBlocks: DataWithChildren<EditorBlock>[] | null | undefined,
    areaId: string,
) => {
    const slots = innerBlocks?.filter(
        block => block.__typename === 'CustomLayoutSlot',
    );

    return slots?.find(s => s.attributes?.areaId === areaId);
};
