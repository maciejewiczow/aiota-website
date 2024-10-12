import { GetSeedNodeQuery } from '~/models/graphql.generated';
import { WordpressTemplate } from '~/templates/types';

export function getPossibleTemplates(seedQuery: GetSeedNodeQuery['nodeByUri']) {
    const possibleTemplates: string[] = [];

    if (
        (seedQuery?.__typename === 'Post' ||
            seedQuery?.__typename === 'Page' ||
            seedQuery?.__typename === 'MediaItem') &&
        seedQuery?.template?.templateName &&
        seedQuery?.template?.templateName !== 'Default'
    ) {
        possibleTemplates.push(`template-${seedQuery.template.templateName}`);
    }

    // Front page
    if (seedQuery?.__typename === 'Page' && seedQuery.isFrontPage) {
        possibleTemplates.push('front-page');
    }

    // Blog page
    if (seedQuery?.__typename === 'Page' && seedQuery.isPostsPage) {
        possibleTemplates.push('home');
    }

    // CPT archive page
    if (seedQuery?.__typename === 'ContentType' && !seedQuery.isPostsPage) {
        if (seedQuery.name) {
            possibleTemplates.push(`archive-${seedQuery.name}`);
        }

        possibleTemplates.push('archive');
    }

    // Archive Page
    if (
        (seedQuery?.__typename === 'Category' ||
            seedQuery?.__typename === 'Tag' ||
            seedQuery?.__typename === 'PostFormat') &&
        seedQuery.isTermNode
    ) {
        const { taxonomyName } = seedQuery;

        switch (taxonomyName) {
            case 'category': {
                if (seedQuery.slug) {
                    possibleTemplates.push(`category-${seedQuery.slug}`);
                }

                if (seedQuery.databaseId) {
                    possibleTemplates.push(`category-${seedQuery.databaseId}`);
                }

                possibleTemplates.push(`category`);

                break;
            }
            case 'post_tag': {
                if (seedQuery.slug) {
                    possibleTemplates.push(`tag-${seedQuery.slug}`);
                }

                if (seedQuery.databaseId) {
                    possibleTemplates.push(`tag-${seedQuery.databaseId}`);
                }

                possibleTemplates.push(`tag`);

                break;
            }
            default: {
                if (taxonomyName) {
                    if (seedQuery.slug) {
                        possibleTemplates.push(
                            `taxonomy-${taxonomyName}-${seedQuery.slug}`,
                        );
                    }

                    if (seedQuery.databaseId) {
                        possibleTemplates.push(
                            `taxonomy-${taxonomyName}-${seedQuery.databaseId}`,
                        );
                    }

                    possibleTemplates.push(`taxonomy-${taxonomyName}`);
                }

                possibleTemplates.push(`taxonomy`);
            }
        }

        possibleTemplates.push(`archive`);
    }

    // Singular page
    if (
        (seedQuery?.__typename === 'Post' ||
            seedQuery?.__typename === 'Page' ||
            seedQuery?.__typename === 'MediaItem') &&
        seedQuery.isContentNode
    ) {
        if (
            seedQuery?.contentType?.node?.name !== 'page' &&
            seedQuery?.contentType?.node?.name !== 'post'
        ) {
            if (seedQuery.contentType?.node?.name && seedQuery.slug) {
                possibleTemplates.push(
                    `single-${seedQuery.contentType?.node?.name}-${seedQuery.slug}`,
                );
            }

            if (seedQuery.contentType?.node?.name) {
                possibleTemplates.push(
                    `single-${seedQuery.contentType?.node?.name}`,
                );
            }
        }

        if (seedQuery?.contentType?.node?.name === 'page') {
            if (seedQuery.slug) {
                possibleTemplates.push(`page-${seedQuery.slug}`);
            }

            if (seedQuery.databaseId) {
                possibleTemplates.push(`page-${seedQuery.databaseId}`);
            }

            possibleTemplates.push(`page`);
        }

        if (seedQuery?.contentType?.node?.name === 'post') {
            if (seedQuery.slug) {
                possibleTemplates.push(
                    `single-${seedQuery.contentType.node.name}-${seedQuery.slug}`,
                );
            }

            possibleTemplates.push(`single-${seedQuery.contentType.node.name}`);
            possibleTemplates.push(`single`);
        }

        possibleTemplates.push(`singular`);
    }

    possibleTemplates.push('index');

    return possibleTemplates;
}

export function getTemplate(
    seedNode: GetSeedNodeQuery['nodeByUri'] | null | undefined,
    templates: Record<string, WordpressTemplate>,
): WordpressTemplate | undefined {
    if (!seedNode) {
        return;
    }

    const possibleTemplates = getPossibleTemplates(seedNode);

    return possibleTemplates.map(pt => templates[pt]).find(t => !!t);
}
