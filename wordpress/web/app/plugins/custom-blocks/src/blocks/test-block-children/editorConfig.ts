import { EditorConfig } from '~/src/types';
import metadata from './block.json';

export const editorConfig: EditorConfig<typeof metadata.attributes> = {
    editorFields: {
        testOwnAttribute: {
            control: 'text',
            label: 'Test block attribute',
        },
    },
};
