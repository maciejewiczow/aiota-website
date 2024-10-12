import { MantineColorsTuple, MantineThemeOverride } from '@mantine/core';

// TODO: fill out the theme data after the designs are completed

const themeOther = {
    fonWweights: {
        light: 200,
        normal: 400,
        medium: 500,
        semiBold: 600,
        bold: 800,
    },
    spacing: {
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
        56: '56px',
        64: '64px',
        80: '80px',
        96: '96px',
        128: '128px',
    },
    breakpoints: {},
} as const;

const themeColors = {
    text: ['', '', '', '', '', '', '', '', '', ''],
} satisfies Record<string, MantineColorsTuple>;

export const theme: MantineThemeOverride = {
    other: themeOther,
    white: '',
    black: '',
    colors: themeColors,
    primaryShade: 0,
    primaryColor: '',
    fontFamily: '',
    headings: {
        fontFamily: '',
        fontWeight: '',
        sizes: {
            h1: {
                fontSize: '',
                lineHeight: '',
                fontWeight: '',
            },
            h2: {
                fontSize: '',
                lineHeight: '',
                fontWeight: '',
            },
            h3: {
                fontSize: '',
                lineHeight: '',
                fontWeight: '',
            },
            h4: {
                fontSize: '',
                lineHeight: '',
                fontWeight: '',
            },
            h5: {
                fontSize: '',
                lineHeight: '',
                fontWeight: '',
            },
            h6: {
                fontSize: '',
                lineHeight: '',
                fontWeight: '',
            },
        },
    },
    radius: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
    fontSizes: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
    lineHeights: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
    breakpoints: {
        mobile: '375px',
        tablet: '768px',
        laptop: '1280px',
        desktop: '1920px',
    },
    shadows: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
};

export type ThemeOther = typeof themeOther;
export type ThemeColors = typeof themeColors;
