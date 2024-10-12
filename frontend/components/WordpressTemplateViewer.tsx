import React from 'react';
import invariant from 'tiny-invariant';
import { getTemplate } from '~/lib/getTemplate';
import { GetSeedNodeQuery } from '~/models/graphql.generated';
import { templateMapping } from '~/templates';

interface WordpressTemplateViewerProps {
    seedQuery: GetSeedNodeQuery;
    uri: string;
}

export const WordpressTemplateViewer: React.FC<
    WordpressTemplateViewerProps
> = ({ seedQuery, uri }) => {
    const Template = getTemplate(seedQuery.nodeByUri, templateMapping);

    invariant(!!Template, `Template for "${uri}" could not be determined`);

    return (
        <Template
            seedQuery={seedQuery}
            uri={uri}
        />
    );
};
