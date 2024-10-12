import { EditorConfig } from '~/src/types';
import metadata from './block.json';

export const editorConfig: EditorConfig<typeof metadata.attributes> = {
    editorFields: {
        link: {
            control: 'url',
            label: 'Link',
            location: 'inspector',
        },
        blank: {
            control: 'toggle',
            defaultValue: false,
            label: 'Open in new tab',
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
