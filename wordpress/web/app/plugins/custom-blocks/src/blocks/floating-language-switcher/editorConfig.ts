import { EditorConfig } from '~/src/types';
import metadata from './block.json';

export const editorConfig: EditorConfig<typeof metadata.attributes> = {
    editorFields: {
        corner: {
            control: 'select',
            location: 'inspector',
            options: [
                {
                    label: 'Top left',
                    value: 'top-left',
                },
                {
                    label: 'Top right',
                    value: 'top-right',
                },
                {
                    label: 'Bottom right',
                    value: 'bottom-right',
                },
                {
                    label: 'Bottom left',
                    value: 'bottom-left',
                },
            ],
        },
    },
};
