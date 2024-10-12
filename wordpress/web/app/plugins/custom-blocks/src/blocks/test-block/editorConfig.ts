import { EditorConfig } from '~/src/types';
import metadata from './block.json';

export const editorConfig: EditorConfig<typeof metadata.attributes> = {
    editorFields: {
        test: {
            control: 'color',
            description: 'Ugabuga',
        },
        numberWithRangeTest: {
            control: 'number',
            min: 10,
            max: 20,
            step: 2,
            order: 1,
        },
        rangeTest: {
            control: 'range',
            min: 0,
            max: 100,
        },
        linkTest: {
            control: 'internal-link',
        },
    },
};
