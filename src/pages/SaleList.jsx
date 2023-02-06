import React from 'react'
import SalesListComponent from '../components/SalesListComponent'
import { month } from '../data/dummy'

const SaleList = () => {

  const date = new Date()

  return (
    <div className="flex justify-center flex-col">
      <div className="flex flex-col p-14 text-center items-center gap-3  bg-blue-400 rounded-b-3xl">
          <h1 className="text-white font-bold text-4xl">Lista Vendas</h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-white font-medium text-2xl">{month()}</h1>
            <h1 className="text-white font-medium text-2xl">{date.getFullYear()}</h1>
          </div>
      </div>
      <div className="flex mt-12 justify-start md:justify-center">
        <SalesListComponent />
      </div>

    </div>
  )
}

export default SaleList