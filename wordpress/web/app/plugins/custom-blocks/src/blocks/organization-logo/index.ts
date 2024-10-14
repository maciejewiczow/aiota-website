import { registerBlock } from '~/src/registerBlock';
import metadata from './block.json';
import { Edit } from './Edit';
import { editorConfig } from './editorConfig';

registerBlock(
    // @ts-expect-error idk how to fix the fact that json cannot be imported as const
    {
        ...metadata,
        edit: Edit,
    },
    editorConfig,
);
