import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { BoxProps } from './Box'

export const Element = styled(
    ({
        as: Component = 'div',
        centered: _centered,
        display: _display,
        height: _height,
        flexDirection: _flexDirection,
        alignItems: _alignItems,
        justifyContent: _justifyContent,
        padding: _padding,
        textAlign: _textAlign,
        stretch: _stretch,
        ...rest
    }: BoxProps) => <Component {...rest} />
)`
    display: ${({ display }) => display || 'block'};
    width: 100%;
    height: ${({ height }) => (height ? height : 'initial')};
    flex-direction: ${({ flexDirection }) =>
        flexDirection ? flexDirection : 'initial'};
    align-items: ${({ alignItems }) => (alignItems ? alignItems : 'initial')};
    justify-content: ${({ justifyContent }) =>
        justifyContent ? justifyContent : 'initial'};
    padding: ${({ padding }) => `var(--spacings-${padding}) `};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'initial')};

    ${({ centered }) =>
        centered &&
        css`
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
        `}

    ${({ stretch }) =>
        stretch &&
        css`
            display: flex;

            > * {
                display: flex;
                align-items: center;
            }
        `}
`
