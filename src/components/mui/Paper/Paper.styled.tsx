import styled from '@emotion/styled'
import { ForwardedRef, forwardRef } from 'react'

import { PaperProps } from '.'

const StyledPaper = (
    {
        borderRadius: _borderRadius,
        width: _width,
        height: _height,
        overflow: _overflow,
        ownerState: _ownerState,
        scroll: _scroll,
        ...rest
    }: PaperProps,
    ref: ForwardedRef<HTMLDivElement>
) => <div {...rest} ref={ref} />

export const Element = styled(forwardRef(StyledPaper))`
    position: relative;
    overflow: ${({ overflow }) => (overflow ? overflow : 'hidden')};
    width: ${({ width }) => (width ? width : 'initial')};
    height: ${({ height }) => (height ? height : 'initial')};
    border-radius: ${({ borderRadius }) =>
        borderRadius ? borderRadius : 'var(--radii-default)'};
    background-color: var(--colors-white);
    box-shadow: var(--shadows-mui);
    overflow-x: ${({ scroll }) =>
        scroll === 'x' || scroll === 'all' ? 'auto' : 'initial'};
    overflow-y: ${({ scroll }) =>
        scroll === 'y' || scroll === 'all' ? 'auto' : 'initial'};
`
