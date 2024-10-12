import { registerBlock } from '~/src/registerBlock';
import metadata from './block.json';
import { editorConfig } from './editorConfig';

// @ts-expect-error idk how to fix the fact that json cannot be imported as const
registerBlock(metadata, editorConfig);
