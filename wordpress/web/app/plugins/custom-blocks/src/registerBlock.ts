import { registerBlockType } from '@wordpress/blocks';
import { withClientProvider } from './apollo';
import { Edit } from './components/Edit';
import { Save } from './components/Save';
import { BlockAttrsWithOptionalEditSave, EditorConfig } from './types';

export const registerBlock = (
    { edit, ...meta }: BlockAttrsWithOptionalEditSave<Record<string, unknown>>,
    config?: EditorConfig<Record<string, unknown>>,
) => registerBlockType(meta.name ?? 'Unnamed block', {
        edit: withClientProvider(edit ?? Edit(meta, config)),
        save: Save(meta, config),
        ...meta,
    });
