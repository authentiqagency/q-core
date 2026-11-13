import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers-pro'
import { forwardRef, useRef } from 'react'
import { Controller } from 'react-hook-form'

import Paper from '../../Paper'
import TextInput from '../TextInput'

import type { FC, FocusEvent, Ref } from 'react'
import type {
    Control,
    ControllerRenderProps,
    FieldValues
} from 'react-hook-form'

import type { TextFieldProps } from '@mui/material'
import type { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers-pro'

type DatePickerProps = Omit<MuiDatePickerProps<Date>, 'renderInput'> & {
    control?: Control<FieldValues>
    error?: boolean
    required?: boolean
    fieldName?: string
    helperText?: string
    mask?: string
    clearable?: boolean
    /** @deprecated no longer supported by MUI X, ignored */
    clearText?: string
}

type PickerTextFieldProps = TextFieldProps & {
    ownerState?: unknown
    onDateBlur?: (value: string) => void
}

// Defined outside of the render so React keeps the same component type
// between renders and does not remount the input (focus loss while typing).
const PickerTextField = forwardRef(function PickerTextField(
    { ownerState: _ownerState, onDateBlur, ...props }: PickerTextFieldProps,
    ref: Ref<HTMLDivElement>
) {
    return (
        <TextInput
            {...(props as any)}
            ref={ref}
            style={{ width: '100%' }}
            onBlur={(e: FocusEvent<HTMLInputElement>) =>
                onDateBlur?.(e.target.value)
            }
        />
    )
})

const DatePicker: FC<DatePickerProps> = ({
    control,
    error,
    fieldName,
    helperText,
    required,
    label,
    onChange,
    value,
    clearable,
    clearText: _clearText,
    slotProps,
    ...props
}) => {
    const pickerRef = useRef<HTMLDivElement | null>(null)

    const handleChange = (
        date: Date | null,
        field: ControllerRenderProps<FieldValues, string>
    ) => {
        field.onChange(date)

        if (control && onChange) {
            ;(onChange as any)(field.name, date, {
                shouldDirty: true,
                shouldValidate: true
            })
        }
    }

    const handleBlur = (
        value: string,
        field: ControllerRenderProps<FieldValues, string>
    ) => {
        if (value === 'DD.MM.YYYY') {
            return handleChange(null, field)
        }

        const [day, month, year] = value.split('.')
        if (!day || !month || !year) {
            return handleChange(null, field)
        }

        handleChange(
            new Date(parseInt(year), parseInt(month) - 1, parseInt(day)),
            field
        )
    }

    const renderPicker = (
        field: ControllerRenderProps<FieldValues, string>
    ) => (
        <div
            ref={(ref) => {
                pickerRef.current = ref
            }}>
            <MuiDatePicker
                value={field.value ? new Date(field.value) : null}
                label={label}
                format="dd.MM.yyyy"
                {...props}
                slots={{
                    desktopPaper: Paper,
                    textField: PickerTextField,
                    ...props.slots
                }}
                slotProps={{
                    ...slotProps,
                    popper: {
                        anchorEl: pickerRef.current,
                        ...(slotProps?.popper as object)
                    },
                    field: {
                        clearable,
                        onClear: () => handleChange(null, field),
                        ...(slotProps?.field as object)
                    },
                    textField: {
                        required,
                        error,
                        helperText,
                        onDateBlur: (value: string) =>
                            handleBlur(value, field),
                        ...(slotProps?.textField as object)
                    } as any
                }}
                onAccept={(date) => handleChange(date, field)}
            />
        </div>
    )

    if (!control) {
        return renderPicker({
            onChange,
            value
        } as ControllerRenderProps<FieldValues, string>)
    }

    return (
        <Controller
            control={control}
            name={fieldName!}
            render={({ field }) => renderPicker(field)}
        />
    )
}

export default DatePicker
