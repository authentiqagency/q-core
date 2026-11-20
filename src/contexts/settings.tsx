import { createContext, FC, ReactElement, useContext } from 'react'

import { RawDesignTokens } from '../utils/styles/designTokens'

type SettingsProps = {
    designTokens?: RawDesignTokens
}

type SettingsProviderProps = {
    children: ReactElement
    settings: SettingsProps
}

const SettingsContext = createContext<SettingsProps>({})

const SettingsProvider: FC<SettingsProviderProps> = ({
    settings,
    children
}) => (
    <SettingsContext.Provider value={settings}>
        {children}
    </SettingsContext.Provider>
)

export default SettingsProvider

export const useSettings = (): SettingsProps => useContext(SettingsContext)
