import { createContext, ReactNode, useState } from 'react'

interface Cbdc {
  balance: number
}

export interface CbdcContextType {
  balance: number
  isFetching: boolean
  getCurrentValues: () => Promise<Cbdc>
}

export const Web3Context = createContext<CbdcContextType>({
  isFetching: false,
  balance: undefined,
  getCurrentValues: async () => ({ balance: undefined, allowance: undefined }),
})

interface Props {
  children: ReactNode
}

export const CbdcContextProvider = ({ children }: Props) => {
  const [isUpdateAllowanceDrawerOpen, setIsUpdateAllowanceDrawerOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const getCurrentValues = async () => {
    return { balance: 100 }
  }

  return (
    <Web3Context.Provider
      value={{
        isFetching,
        balance: 0,
        getCurrentValues,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
