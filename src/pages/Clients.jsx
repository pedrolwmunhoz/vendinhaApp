import React from 'react'
import ClientList from '../components/ClientList'
import { UseStateContext } from '../contexts/ContextProvider'



const Clients = () => {

  const { setClientModalActive } = UseStateContext()

  return (
    <div className="flex justify-center flex-col">
      <div className="flex flex-col p-14 text-center items-center gap-3  bg-blue-400 rounded-b-3xl">
          <h1 className="text-white font-bold text-4xl">Lista Clientes</h1>
      </div>
      <div className="w-full flex justify-end px-8 mt-10">
        <button onClick={()=>setClientModalActive(true)} className="bg-cyan-400 px-4 py-2 rounded-xl text-cyan-900">New Cliente</button>
      </div>
      <div className="flex mt-12 justify-start md:justify-center">
        <ClientList />
      </div>

    </div>
  )
}

export default Clients