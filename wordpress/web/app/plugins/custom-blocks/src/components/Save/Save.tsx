import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { BlockSaveProps } from '@wordpress/blocks';
import { BlockAttrsWithOptionalEditSave, EditorConfig } from '~/src/types';

export const Save = (
    meta: BlockAttrsWithOptionalEditSave<Record<string, unknown>>,
    config?: EditorConfig<Record<string, unknown>>,
): React.FC<BlockSaveProps<Record<string, unknown>>> => function CustomBlockSave() {
        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <InnerBlocks.Content />
        );
    };
