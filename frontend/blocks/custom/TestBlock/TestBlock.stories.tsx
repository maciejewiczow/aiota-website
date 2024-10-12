import type { Meta, StoryObj } from '@storybook/react';
import { TestBlock as TestBlockComponent } from './TestBlock';

interface StoryArgs {
    link: string;
    number: number;
    numberRange: number;
    toggle: boolean;
    range: number;
    color: string;
}

const meta: Meta<StoryArgs> = {
    component: ({ link, color, number, numberRange, range, toggle }) => (
        <TestBlockComponent
            block={{
                __typename: 'CustomTest',
                clientId: null,
                parentClientId: null,
                name: null,
                renderedHtml: null,
                attributes: {
                    __typename: 'CustomTestAttributes',
                    linkTest: link,
                    numberTest: number,
                    numberWithRangeTest: numberRange,
                    rangeTest: range,
                    toggleTest: toggle,
                    test: color,
                },
            }}
        />
    ),
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const TestBlock: Story = {
    args: {
        color: '#696969',
        link: '/',
        number: 2137,
        numberRange: 69,
        range: 420,
        toggle: false,
    },
};
