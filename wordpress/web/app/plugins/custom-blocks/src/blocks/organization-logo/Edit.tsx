import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { ResizableBox } from '@wordpress/components';

export const Edit: React.FC<BlockEditProps<Record<string, unknown>>> = ({
    isSelected,
    attributes,
    setAttributes,
}) => {
    const { data, loading } = useQuery(gql`
        query GetOrganizationLogo {
            seo {
                schema {
                    logo {
                        sourceUrl
                        altText
                        mediaDetails {
                            height
                            width
                        }
                    }
                }
            }
        }
    `);
    const blockProps = useBlockProps();
    const [width, setWidth] = useState<number>(attributes.width as number);

    useEffect(() => {
        if (
            data &&
            data.seo?.schema?.logo?.mediaDetails?.width &&
            !attributes.width
        ) {
            setWidth(data.seo.schema.logo.mediaDetails.width);
        }
    }, [attributes.width, data]);

    if (loading) {
        return <div {...blockProps}>Loading...</div>;
    }

    const aspect =
        data.seo?.schema?.logo?.mediaDetails?.width &&
        data.seo?.schema?.logo?.mediaDetails?.height
            ? data.seo?.schema?.logo?.mediaDetails?.width /
              data.seo?.schema?.logo?.mediaDetails?.height
            : 1;

    const height = width / aspect;

    const imgWidth = width > height ? 'unset' : '100%';
    const imgHeight = width > height ? '100%' : 'unset';

    return (
        <div {...blockProps}>
            <ResizableBox
                enable={{
                    bottom: false,
                    bottomLeft: false,
                    bottomRight: true,
                    left: false,
                    right: false,
                    top: false,
                    topLeft: false,
                    topRight: false,
                }}
                showHandle={isSelected}
                onResize={(_, __, ref) => {
                    setWidth(ref.clientWidth);

                    setAttributes({
                        width: ref.clientWidth,
                        height: ref.clientHeight,
                    });
                }}
                size={{
                    width,
                    height,
                }}
                lockAspectRatio={aspect}
                __experimentalShowTooltip
            >
                <img
                    style={{
                        aspectRatio: aspect,
                        width: imgWidth,
                        height: imgHeight,
                    }}
                    src={data.seo?.schema?.logo?.sourceUrl}
                    alt={data.seo?.schema?.logo?.altText ?? ''}
                />
            </ResizableBox>
        </div>
    );
};
