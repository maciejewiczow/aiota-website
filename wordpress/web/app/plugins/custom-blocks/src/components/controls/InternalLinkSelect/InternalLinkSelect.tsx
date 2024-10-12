import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ComboboxControl } from '@wordpress/components';

interface InternalLinkSelectProps {
    value: string;
    onChange: (val: string | undefined | null) => void;
    label?: string;
    description?: string;
}

export const InternalLinkSelect: React.FC<InternalLinkSelectProps> = ({
    value,
    onChange,
    label,
    description,
}) => {
    const { loading, error, data } = useQuery(gql`
        query GetAllNodes {
            contentNodes {
                edges {
                    node {
                        uri
                        ... on NodeWithTitle {
                            title
                        }
                    }
                }
            }
        }
    `);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading data</div>;
    }

    return (
        <ComboboxControl
            value={value}
            onChange={onChange}
            label={label}
            help={description}
            options={
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.contentNodes.edges.map(({ node }: any) => ({
                    label: node.title,
                    value: node.uri,
                }))
            }
        />
    );
};
