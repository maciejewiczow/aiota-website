import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './components/Edit';
import { Save } from './components/Save';
import { BlockAttrsWithOptionalEditSave, EditorConfig } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
export const registerBlock = (
    meta: BlockAttrsWithOptionalEditSave<Record<string, unknown>>,
    config?: EditorConfig<Record<string, unknown>>,
) => registerBlockType(meta.name ?? 'Unnamed block', {
        edit: Edit(meta, config),
        save: Save(meta, config),
        ...meta,
    });
