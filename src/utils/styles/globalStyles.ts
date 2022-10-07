import { css, SerializedStyles } from '@emotion/react'
import {
    RawDesignTokens,
    ResponsiveTokens,
    TokenComponents
} from './designTokens'
import { from, until } from '../breakpoints'

const renderTokens = (
    tokens: RawDesignTokens | ResponsiveTokens = {}
): string =>
    Object.entries(tokens)
        .filter(
            ([namespace]) =>
                !['breakpoints', 'responsiveTokens', 'components'].includes(
                    namespace
                )
        )
        .map(([namespace, token]) =>
            Object.entries(token).map(
                ([name, value]) => `--${namespace}-${name}: ${value};`
            )
        )
        .flat()
        .join('\n')

const renderComponentTokens = (tokens: TokenComponents = {}): string =>
    Object.entries(tokens)
        .flatMap(([componentName, componentTokens]) =>
            Object.entries(componentTokens).flatMap(
                ([propOrVariantName, valueOrVariant]) =>
                    typeof valueOrVariant === 'string'
                        ? `--${componentName}-${propOrVariantName}: ${valueOrVariant};`
                        : Object.entries(valueOrVariant).flatMap(
                              ([propName, value]) =>
                                  `--${componentName}-${propOrVariantName}-${propName}: ${value};`
                          )
            )
        )
        .join('\n')

export const generateGlobalStyles = ({
    designTokens,
    customVariables,
    customReset
}: {
    designTokens: RawDesignTokens
    customVariables: SerializedStyles
    customReset: SerializedStyles
}) => css`
    :root {
        ${renderTokens(designTokens)}

        ${renderComponentTokens(designTokens.components)}

        ${customVariables}
    }

    ${Object.entries(designTokens.responsiveTokens || {})
        .map(
            ([breakpoint, responsiveTokens]) => `
                @media ${from[breakpoint]} {
                    :root {
                        ${renderTokens(responsiveTokens)}

                        ${renderComponentTokens(responsiveTokens.components)}

                    }
                }
            `
        )
        .join('\n')}

    // FIXME: Can we improve this to be less generic?
    * {
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }

    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
        margin: 0;
    }

    ::selection {
        background-color: var(--selection-backgroundColor);
        color: var(--colors-white);
    }

    ::placeholder {
        color: var(--placeholder-color);
    }

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb-background);
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-thumb-backgroundHover);
    }

    ::-webkit-scrollbar-track {
        background: var(--scrollbar-track-background);
    }

    :disabled {
        cursor: var(--cursors-disabled);
        opacity: var(--opacity-disabled);
    }

    html {
        accent-color: var(--colors-primary);
        color: var(--colors-black);
        scrollbar-color: var(--scrollbar-thumb-background)
            var(--scrollbar-track-background);
    }

    body {
        font-family: var(--fonts-body);
        font-size: var(--fontSizes-default);
        font-weight: var(--fontWeights-default);
        letter-spacing: var(--letterSpacings-default);
        line-height: var(--spacings-default);
        -ms-overflow-style: scrollbar;
        overflow-y: scroll;

        @media ${until.desktopS} {
            &.noscroll {
                position: fixed;
                overflow: hidden;
                width: 100%;
            }
        }
    }

    html,
    body,
    // eslint-disable-line selector-id-pattern
    #__next {
        height: 100%;
    }

    ol,
    ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    ${customReset}
`
