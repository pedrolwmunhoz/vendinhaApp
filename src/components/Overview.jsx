import React, { useEffect } from 'react'
import { UseStateContext } from '../contexts/ContextProvider'
import { month } from '../data/dummy'
import IconList from './IconList'

const Overview = () => {

  const { saleListValueTotal, saleList, setPedingValue, pedingValue, paidSales, setPaidSales } = UseStateContext()
  const date = new Date()

  useEffect(()=>{
    setPedingValue(0)
    setPaidSales(0)
    saleList.map((i)=>{
      if(!i.isPaid){
        setPedingValue((old)=>old+i.value)
      }else setPaidSales((old)=>old+i.value)
    })
  },[saleList])

  return (
    <div className="flex w-full px-5 flex-col">
      <h1 className="font-bold">Visão geral do mês</h1>
      <div className="flex flex-row gap-1 text-gray-500">
        <p>{month()},</p>
        <p>{date.getFullYear()}</p>
      </div>
      <div className="flex flex-col gap-2 mt-10">
         <div className="flex flex-row items-center gap-4">
          <IconList name= "-$" />
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col">
              <h1>Total pendentes:</h1>
              <p className="text-sm text-gray-400">Valor total em pendentes</p>
            </div>
            <p className="text-red-500 font-bold text-xl">R$ {pedingValue}</p>
          </div>
         </div>
         <div className="flex flex-row items-center gap-4">
          <IconList name= "+$" />
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col">
              <h1>Total pagas:</h1>
              <p className="text-sm text-gray-400">Valor total em pagas</p>
            </div>
            <p className="text-green-600 font-bold text-xl">R$ {paidSales}</p>
          </div>
         </div>
         <div className="flex flex-row items-center gap-4">
          <IconList name= "$" />
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col">
              <h1>Total vendas:</h1>
              <p className="text-sm text-gray-400">Valor total em vendas</p>
            </div>
            <p className="text-cyan-600 font-bold text-xl">R$ {saleListValueTotal}</p>
          </div>
         </div>
      </div>
    </div>
  )
}

export default Overview