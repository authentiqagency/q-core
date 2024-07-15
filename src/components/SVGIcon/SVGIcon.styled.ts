import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { forwardRef, ForwardRefRenderFunction } from 'react'

import { from } from '../../utils/breakpoints'

import { SVGIconProps } from './SVGIcon'

const StyledSVG: ForwardRefRenderFunction<HTMLDivElement, SVGIconProps> = (
    { breakpoints: _breakpoints, size: _size, children, ...rest },
    ref
) => React.createElement('div', { ...rest, ref } as any, children)

export const Container = styled(
    forwardRef<HTMLDivElement, SVGIconProps>(StyledSVG)
)`
    --_width: var(
        --icon-${({ size }) => size}-width,
        var(--icon-default-width, 24px)
    );
    --_height: var(
        --icon-${({ size }) => size}-height,
        var(--icon-default-height, 24px)
    );

    ${({ breakpoints }) =>
        css`
            ${breakpoints &&
            Object.entries(breakpoints)
                .map(
                    ([breakpoint, { size }]) =>
                        size &&
                        `
                @media ${from[breakpoint]} {
                    --_width: var(--icon-${size}-width);
                    --_height: var(--icon-${size}-height);
                }
            `
                )
                .join('\n')}
        `}

    display: inline-flex;
    width: var(--_width);
    height: var(--_height);
    flex-shrink: 0;

    svg {
        width: 100%;
        height: 100%;
    }
`
