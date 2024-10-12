export {};

declare global {
    type Defined<T> = Exclude<T, undefined | null>;

    namespace NodeJS {
        export interface ProcessEnv {
            NEXT_PUBLIC_WORDPRESS_URL: string;
            NEXT_PUBLIC_SITE_URL: string;
        }
    }
}
