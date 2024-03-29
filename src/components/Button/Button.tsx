import React, { ComponentType, ButtonHTMLAttributes, FC } from 'react'

import Stack from '../layout/Stack'

import * as Styled from './Button.styled'

export type ButtonVariant = 'primary' | 'secondary'

export type Spacing = 'small' | 'tiny'

export interface ButtonProps
    extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
    as?: string | ComponentType
    children: React.ReactNode
    variant: ButtonVariant
    endIcon?: React.ReactNode
    height?: string
    startIcon?: React.ReactNode
    width?: string
    spacing?: Spacing
}

const Button: FC<ButtonProps> = ({
    variant = 'primary',
    endIcon,
    startIcon,
    spacing = 'small',
    children,
    ...props
}) => {
    const withIcon = (
        <Stack
            alignItems="center"
            direction="horizontal"
            spacing={spacing}
            justifyContent="center">
            {startIcon && <Styled.Icon>{startIcon}</Styled.Icon>}
            <span>{children}</span>
            {endIcon && <Styled.Icon>{endIcon}</Styled.Icon>}
        </Stack>
    )

    return (
        <Styled.Button variant={variant} {...props}>
            {startIcon || endIcon ? withIcon : children}
        </Styled.Button>
    )
}

export default Button
