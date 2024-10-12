import type { StorybookConfig } from '@storybook/nextjs';
import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
    stories: ['../**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    webpackFinal: config => {
        const plugin = new TSConfigPathsPlugin();

        if (config.resolve?.plugins) {
            config.resolve.plugins.push(plugin);
        } else if (config.resolve) {
            config.resolve.plugins = [plugin];
        }

        return config;
    },
};

export default config;
