interface Data {
    clientId?: string | null;
    parentClientId?: string | null;
}

export type DataWithChildren<TData> = Data & {
    innerBlocks?: DataWithChildren<TData>[] | null;
} & TData;

/**
 * Converts a flat list to hierarchical.
 *
 * @param data The data items as an array.
 * @returns Data Array
 */
export function flatListToHierarchical<TData extends Data>(
    data: TData[] = [],
): DataWithChildren<TData>[] {
    const tree: DataWithChildren<TData>[] = [];
    const childrenOf: Record<string, DataWithChildren<TData>[]> = {};

    data.forEach(item => {
        const id = item.clientId;
        const parentId = item.parentClientId;

        if (!id) {
            return;
        }

        childrenOf[id] = childrenOf[id] || [];

        const newItem: DataWithChildren<TData> = {
            ...item,
            innerBlocks: childrenOf[id],
        };

        parentId
            ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
            : tree.push(newItem);
    });

    return tree;
}
