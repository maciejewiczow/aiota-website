import { EditorConfig } from '~/src/types';
import metadata from './block.json';

export const editorConfig: EditorConfig<typeof metadata.attributes> = {
    editorFields: {
        link: {
            control: 'internal-link',
            label: 'Link',
            location: 'inspector',
        },
        linkAppearance: {
            control: 'toggle',
            defaultValue: true,
            label: 'Link appearance',
            description: 'Should it look like a link or no?',
            location: 'inspector',
        },
    },
};
