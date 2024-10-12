import { GetSeedNodeQuery } from '~/models/graphql.generated';

export interface TemplateProps {
    uri: string;
    seedQuery: GetSeedNodeQuery;
}

export type WordpressTemplate = React.ComponentType<TemplateProps>;
