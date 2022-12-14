const [, offsetHours] = new Date(2022, 0, 1).toISOString().split('T')

export const format = (
    date: string | Date,
    {
        locale,
        ...options
    }: Intl.DateTimeFormatOptions & { locale: Intl.LocalesArgument }
): string => {
    if (!date) return ''
    if (typeof date === 'string') {
        date = new Date(date)
    }

    const config: Intl.DateTimeFormatOptions = {
        timeZone: options.timeZone || 'Europe/Zurich',
        ...options
    }

    return date.toLocaleString(locale || 'de-CH', config)
}

export const formatDate = (
    date: string | Date,
    locale = 'de-CH',
    timeZone = 'Europe/Zurich'
): string =>
    format(date, {
        day: '2-digit',
        locale,
        month: '2-digit',
        timeZone,
        year: 'numeric'
    })

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isValidDate = (date: any): boolean =>
    Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)

export const dateToTimestamp = (date: Date): number | undefined => {
    if (!date) return

    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000)

    return parseInt(
        date.getFullYear() +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            date.getDate().toString().padStart(2, '0'),
        10
    )
}

export const timestampToDate = (timestamp: number): Date | null => {
    if (!timestamp) return null

    const timestampStr = timestamp.toString()

    const date = new Date(
        `${timestampStr.slice(0, 4)}-${timestampStr
            .slice(4, 6)
            .toString()
            .padStart(2, '0')}-${timestampStr
            .slice(6, 8)
            .toString()
            .padStart(2, '0')}T${offsetHours}`
    )

    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}
