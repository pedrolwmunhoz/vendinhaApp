import React, { useEffect, useState } from 'react'
import { UseStateContext } from '../contexts/ContextProvider'

const OverviewPedingButton = ( props ) => {
    const { bgOverviewButton ,setBgOverviewButton,bgPendingButton, setBgPendingButton } = UseStateContext()

    const [pedingValueButton, setPedingValueButton] = useState("")

    useEffect(()=>{
      if(props.id === 1){
        setPedingValueButton(bgOverviewButton)
      }
    },[bgOverviewButton, props.id])

    useEffect(()=>{
      if(props.id === 2){
        setPedingValueButton(bgPendingButton)
      }
    },[bgPendingButton, props.id])

    return(
      <button
        id={props.id}
        className={`px-12 py-3 border-2 border-solid rounded-xl border-gray-300 w-button  ${pedingValueButton}`}
        onClick={()=>{
          if( props.id === 1 ){
            setBgOverviewButton("bg-white")
            setBgPendingButton("bg-gray-300")
          }else{
            setBgOverviewButton("bg-gray-300")
            setBgPendingButton("bg-white")
          }
        }}
      >
        { props.name }
      </button>
    )
}

export default OverviewPedingButton