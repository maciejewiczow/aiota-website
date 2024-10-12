const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules: [...defaultConfig.module.rules],
    },
    resolve: {
        ...defaultConfig.resolve,
        plugins: [
            ...(defaultConfig.resolve.plugins ?? []),
            new TsconfigPathsPlugin(),
        ],
    },
};
