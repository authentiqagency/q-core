import { NextSeo, NextSeoProps } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'

type MetaProps = NextSeoProps & {
    appBaseUrl: string
    image: string
    manifest: string
    siteName: string
    themeColor: string
    title: string
    description: string
    noindex: boolean
    nofollow: boolean
    canonical: string
}

const Meta: FC<MetaProps> = ({
    siteName,
    appBaseUrl,
    title,
    description,
    image = '/android-chrome-512x512.png',
    themeColor = '#111111',
    manifest = '/site.webmanifest',
    noindex = false,
    nofollow = false,
    canonical
}) => {
    const { asPath, locale: currentLocale, locales } = useRouter()

    return (
        <>
            <NextSeo
                defaultTitle={title}
                description={description}
                canonical={canonical || `${appBaseUrl}${asPath}`}
                languageAlternates={locales
                    ?.filter((locale) => locale !== currentLocale)
                    .map((locale) => ({
                        href: `${appBaseUrl}/${locale}${asPath}`,
                        hrefLang: locale
                    }))}
                openGraph={{
                    description: description,
                    images: [
                        {
                            url: image
                        }
                    ],
                    locale: currentLocale,
                    site_name: siteName,
                    url: `${appBaseUrl}${asPath}`
                }}
                noindex={noindex}
                nofollow={nofollow}
            />
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link rel="manifest" href={manifest} />
                <link href={appBaseUrl} rel="home"></link>
                <meta name="msapplication-TileColor" content={themeColor} />
                <meta name="theme-color" content={themeColor} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={`/favicon-32x32.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={`/favicon-16x16.png`}
                />
                <link rel="shortcut icon" href={`/favicon.ico`} />
            </Head>
        </>
    )
}

export default Meta
