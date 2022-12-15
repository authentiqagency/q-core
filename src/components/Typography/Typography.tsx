import { ComponentType, FC, HTMLAttributes } from 'react'

import { Display, FontSize, FontWeight } from '../../types'

import * as Styled from './Typography.styled'

export interface TypographyProps
    extends Partial<HTMLAttributes<HTMLParagraphElement>> {
    as?: string | ComponentType<any>
    display?: Display
    fontSize?: FontSize
    fontWeight?: FontWeight
}

const Typography: FC<TypographyProps> = (props) => <Styled.Element {...props} />

export default Typography
