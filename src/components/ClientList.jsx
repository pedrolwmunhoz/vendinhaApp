import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { UseStateContext } from '../contexts/ContextProvider'
import ClientModal from './ClientModal'
import IconList from './IconList'
import SaleModal from './SaleModal'

const ClientList = () => {

  const { saleList, setSaleModalActive, setClientId } = UseStateContext()

  const [pagination, setPagination] = useState(0)
  const [list, setList] = useState([])
  const [clients, setClients] = useState([])

  useEffect(()=>{
    Axios.get(`https://vendinhaapi.azurewebsites.net/api/clients/`)
    .then((resp)=>{
        setClients(resp.data)
    })
  },[])

  useEffect(()=>{

    setList([])
    for (let cont = 0; cont < 5; cont++) {
        if(pagination + cont < clients.length){
            setList((oldArray)=>[...oldArray, clients[pagination+cont]])
            if (cont === clients.length - pagination ) break
        }
    }
  },[pagination, saleList, clients])


  return (
    <div className="flex w-full px-5 md:w-1/2 flex-col ">
        <div className="flex flex-col gap-3">
            { list?.map((client,index)=>{
                return(
                    <div className="flex flex-row gap-3 items-center" key={index}>
                        <IconList name= { client.name[0] } />
                        <div className="flex flex-col w-1/4">
                            <div className="flex flex-row gap-2">
                                <h1 className="text-xs md:text-sm text-bold  text-gray-400">Cliente:</h1>
                                <p className="text-xs md:text-sm">{client.name}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <h1 className="text-xs md:text-sm text-bold  text-gray-400">Email:</h1>
                                <p className="text-xs md:text-sm">{client.email}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <h1 className="text-xs md:text-sm text-bold  text-gray-400">Data Nascimento:</h1>
                                <p className="text-xs md:text-sm">{client.birth_date}</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <button onClick={()=>{
                                setSaleModalActive(true)
                                setClientId(client.id)
                                }} 
                                className="px-2 py-2 md:px-5 md:py-2 text-xs lg:text-xl bg-green-300 rounded-lg text-green-900"
                            >
                                Add Venda
                            </button>
                        </div>
                    </div>
                )
            })}
            <SaleModal />
            <ClientModal />
        </div>
        <div className="flex flex-row gap-5 w-full justify-center mb-14">
            <button onClick={()=>{
                    pagination === 0 ? setPagination(0) : setPagination((old)=>old-5)
                }}
            >
                {"<"}
            </button>
            <button onClick={()=>{
                setPagination((old)=>old+5 <= clients.length ? old+5 : old )
            }}

            >
                {">"}
            </button>
        </div>
    </div>
  )
}

export default ClientList