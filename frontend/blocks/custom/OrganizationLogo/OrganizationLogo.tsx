import { gql } from '@apollo/client';
import { BlockComponent } from '~/blocks/types';
import { useLogoData } from '~/context/LogoData';
// import classes from './PageLogo.module.css';

export const organizationLogoFragment = gql`
    fragment OrganizationLogo on CustomOrganizationLogo {
        attributes {
            width
            height
        }
    }
`;

export const OrganizationLogo: BlockComponent<'CustomOrganizationLogo'> = ({
    block: { attributes },
}) => {
    const data = useLogoData();

    const aspect =
        (data.schema?.logo?.mediaDetails?.width ?? 1) /
        (data.schema?.logo?.mediaDetails?.height ?? 1);

    return (
        data.schema?.logo?.sourceUrl && (
            <img
                style={{
                    aspectRatio: aspect,
                }}
                width={attributes?.width ?? undefined}
                height={attributes?.height ?? undefined}
                src={data.schema?.logo?.sourceUrl}
                alt={data.schema?.logo?.altText ?? ''}
            />
        )
    );
};
