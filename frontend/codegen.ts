import 'dotenv/config';
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/index.php?graphql`,
    documents: ['./**/*.tsx', './**/*.ts', '!./models/graphql.generated.ts'],
    ignoreNoDocuments: true,
    generates: {
        './models/graphql.generated.ts': {
            plugins: ['typescript', 'typescript-operations'],
            config: {
                avoidOptionals: true,
                nonOptionalTypename: true,
            },
        },
    },
};

export default config;
