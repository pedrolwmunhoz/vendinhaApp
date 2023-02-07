import React, { useEffect, useState } from 'react'
import Overview from '../components/Overview'
import OverviewPedingButton from '../components/OverviewPedingButton'
import Axios from 'axios'
import { month } from '../data/dummy'
import { UseStateContext } from '../contexts/ContextProvider'
import PedingSales from '../components/PedingSales'

const Home = () => {

  const date = new Date()

  const { setSaleList, saleListValueTotal, setSaleListValueTotal } = UseStateContext()

  const [overview, setOverview] = useState(true)
  const [peding, setPeding] = useState(false)

  useEffect(()=>{
    setSaleList([])
    setSaleListValueTotal(0)
    Axios.get("https://vendinhaapi.azurewebsites.net/api/saleList")
    .then((resp)=> {
      resp.data.map((list)=>setSaleListValueTotal((old)=>old+list.value))
      setSaleList(resp.data)
    })
  },[])

  return (
    <div className="flex justify-center flex-col">
        <div className="flex flex-col p-14 text-center items-center gap-3  bg-blue-400 rounded-b-3xl">
            <h1 className="text-white font-bold text-4xl">Valor Pendente</h1>
            <div className="flex flex-row gap-2">
              <h1 className="text-white font-medium text-2xl">{month()}</h1>
              <h1 className="text-white font-medium text-2xl">{date.getFullYear()}</h1>
            </div>
            <div>
              <h2 className="text-white font-medium text-3xl">R$ {saleListValueTotal}</h2>
            </div>
        </div>
        <div className="flex flex-col items-center mt-14 gap-10 mb-14">
          <div className='bg-gray-300 rounded-xl flex flex-row justify-center'>
            <div onClick={()=>{
                setPeding(false)
                setOverview(true)
              }}
              className="flex"
            >
                <OverviewPedingButton name = "Visão geral" id= {1} />
            </div>
            <div onClick={()=>{
                setOverview(false)
                setPeding(true)
              }}
              className="flex"
            >
              <OverviewPedingButton name = "Vendas pendentes" id={2} />
            </div>
          </div>
          { overview ? (<Overview />) : (<></>) }
          { peding ? (<PedingSales />): (<></>)}

        </div>
    </div>
  )
}

export default Home