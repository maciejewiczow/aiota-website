import { EditorConfig } from '~/src/types';
import metadata from './block.json';

export const editorConfig: EditorConfig<typeof metadata.attributes> = {
    editorFields: {
        allowScrollOnMobile: {
            control: 'toggle',
            location: 'inspector',
            label: 'Allow scroll on mobile',
        },
    },
};
