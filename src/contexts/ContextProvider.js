import React , { createContent, createContext, useContext, useState } from 'react'

const StateContext = createContext();



export const ContextProvider = ({children}) =>{

    const [bgOverviewButton, setBgOverviewButton] = useState("bg-white")
    const [bgPendingButton, setBgPendingButton] = useState("bg-gray-300")
    const [saleList, setSaleList] = useState([])
    const [saleListValueTotal, setSaleListValueTotal] = useState(0)
    const [pedingValue, setPedingValue] = useState(0)
    const [paidSales, setPaidSales] = useState(0)
    const [saleModalActive, setSaleModalActive] = useState(false)
    const [clientModalActive, setClientModalActive] = useState(false)
    const [clientId, setClientId] = useState(0)
    const [clientsList, setClientsList] = useState([])


    return (
        <StateContext.Provider
            value={{
                bgOverviewButton,
                setBgOverviewButton,
                bgPendingButton,
                setBgPendingButton,
                saleList,
                setSaleList,
                saleListValueTotal,
                setSaleListValueTotal,
                pedingValue,
                setPedingValue,
                paidSales,
                setPaidSales,
                saleModalActive,
                setSaleModalActive,
                clientModalActive,
                setClientModalActive,
                clientId,
                setClientId,
                clientsList,
                setClientsList
            }}
        >
                {children}
        </StateContext.Provider>
    )
}

export const UseStateContext = ()=> useContext(StateContext)