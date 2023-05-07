import { ReactNode, createContext, useState } from "react"

interface ProviderValues {
  updateStatistics: () => void
  updatedStatistics: boolean
}

export const StatisticsContext = createContext({} as ProviderValues)

interface Props {
  children: ReactNode
}

export const StatisticsProvider = ({ children }: Props) => {
  const [updatedStatistics, setUpdatedStatistics] = useState(false)

  const updateStatistics = () => setUpdatedStatistics(prevState => !prevState)

  return (
    <StatisticsContext.Provider
      value={{
        updateStatistics,
        updatedStatistics,
      }}
    >
      {children}
    </StatisticsContext.Provider>
  )
}
