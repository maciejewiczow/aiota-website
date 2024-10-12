'use client';

import React from 'react';
import { EditorBlock } from '~/api/queries/getEditorBlocks';
import { Fallback } from '~/blocks/Fallback';
import { useBlockMapping } from '~/context/BlockMapping';
import { getComponentForBlock } from '~/lib/getComponentForBlock';
import { DataWithChildren } from '~/utils/flatListToHierarchical';

interface WordPressBlockViewerProps {
    blocks: DataWithChildren<EditorBlock>[] | null | undefined;
}

export const WordPressBlockViewer: React.FC<WordPressBlockViewerProps> = ({
    blocks,
}) => {
    const blockMapping = useBlockMapping();

    if (!blocks) {
        return null;
    }

    const blockComponents = blocks.map(block => {
        if (!block) {
            return null;
        }

        const BlockComponent = getComponentForBlock(blockMapping, block);

        if (!BlockComponent) {
            console.warn(
                `Could not match a react component to block of type ${block.__typename}`,
            );
            return (
                <Fallback
                    key={block.clientId}
                    block={block}
                />
            );
        }

        return (
            <BlockComponent
                key={block.clientId}
                block={block}
            />
        );
    });

    return <>{blockComponents}</>;
};
