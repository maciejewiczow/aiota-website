import { PropsWithChildren } from 'react';
import '@mantine/core/styles.css';
import '~/styles/global.css';

export default function RootLayout({ children }: PropsWithChildren) {
    return children;
}
