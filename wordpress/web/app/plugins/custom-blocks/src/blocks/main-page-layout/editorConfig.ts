import { EditorConfig } from '~/src/types';
import metadata from './block.json';

export const editorConfig: EditorConfig<typeof metadata.attributes> = {
    editorFields: {},
    template: {
        // lock: true,
        blocks: [
            ['custom/layout-slot', { areaId: 'logo' }],
            ['custom/layout-slot', { areaId: 'header' }],
            ['custom/layout-slot', { areaId: 'socials' }],
            ['custom/layout-slot', { areaId: 'emails' }],
        ],
    },
};
