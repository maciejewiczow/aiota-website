import { capitalize } from 'lodash';
import { EditorConfig } from '~/src/types';
import metadata from './block.json';

export const editorConfig: EditorConfig<typeof metadata.attributes> = {
    editorFields: {
        areaId: {
            control: 'text',
            hidden: true,
        },
    },
    blockTitle: (meta, attrs) => capitalize(attrs.areaId),
};
