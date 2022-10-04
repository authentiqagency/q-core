import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react'
import * as Styled from './Paper.styled'

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
    borderRadius?: string
    width?: string
    height?: string
    overflow?: string
    scroll?: 'x' | 'y' | 'all'
}

const Paper = (props: PaperProps, ref: ForwardedRef<HTMLDivElement>) => (
    <Styled.Element {...props} ref={ref} />
)

export default forwardRef<HTMLDivElement, PaperProps>(Paper)