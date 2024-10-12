import { EditorConfig } from '~/src/types';
import metadata from './block.json';

export const editorConfig: EditorConfig<typeof metadata.attributes> = {
    editorFields: {
        myAttribute: {
            control: 'internal-link',
        },
    },
    template: {
        blocks: [
            [
                'custom/test-block-with-children',
                {},
                [
                    [
                        'custom/test-block-with-children',
                        {},
                        [['custom/test-block-with-children']],
                    ],
                ],
            ],
        ],
        lock: true,
    },
} as const;
