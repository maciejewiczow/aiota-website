import React, { PropsWithChildren } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import classes from './InternalLink.module.css';

interface InternalLinkProps extends PropsWithChildren {
    href: string;
    hoverUnderline: boolean;
    className?: string;
}

export const InternalLink: React.FC<InternalLinkProps> = ({
    href,
    hoverUnderline,
    children,
    className,
}) => (
    <Link
        className={cx(classes.root, hoverUnderline && classes.link, className)}
        href={href}
    >
        {children}
    </Link>
);
