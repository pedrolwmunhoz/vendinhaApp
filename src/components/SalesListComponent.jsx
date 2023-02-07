import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { UseStateContext } from '../contexts/ContextProvider'
import IconList from './IconList'

const SalesListComponent = () => {


  const [pagination, setPagination] = useState(0)
  const [list, setList] = useState([])
  const [saleList, setSaleList] = useState([])
  const [clients, setClients] = useState([])


  useEffect(()=>{
    setList([])
    for (let cont = 0; cont < 5; cont++) {
        if ((cont + pagination) === saleList.length ) break
        setList((old)=>[...old, saleList[pagination+cont]])
    }
    },[pagination, saleList])
    
    useEffect(()=>{
        setSaleList([])
        setList([])
        Axios.get(`https://vendinhaapi.azurewebsites.net/api/saleList/`)
        .then((resp)=>{
            setSaleList(resp.data)
        })
        Axios.get(`https://vendinhaapi.azurewebsites.net/api/clients/`)
        .then((resp)=>{
            setClients(resp.data)
        })
    },[])

  const handleIconBg = (id)=>{
    for (let cont = 0; cont < list.length; cont++) {
        if(list[cont].clientId === id){
            if(list[cont].isPaid){
                return "+$"
            }
            else return "-$"
        }
    }
  }

  const handleName = (id)=>{
    for (let cont = 0; cont < clients.length; cont++) {
        if(clients[cont].id === id){
            return clients[cont].name
        }
    }
  }
  return (
    <div className="flex w-full px-5 flex-col ">
        <div className="flex flex-col gap-3">
            { list?.map((client,index)=>{
                return(
                    <div className="flex flex-row gap-3 items-center" key={index}>
                        <IconList name= { handleIconBg(client.clientId) } />
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sm text-bold  text-gray-400">Cliente:</h1>
                                <p className="text-sm">{handleName(client.clientId)}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sm text-bold  text-gray-400">Valor:</h1>
                                <p className="text-sm">{client.value}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sm text-bold  text-gray-400">Data:</h1>
                                <p className="text-sm">{client.creationDate[8]}{client.creationDate[9]}{"/"}{client.creationDate[6]}{client.creationDate[5]}/{client.creationDate[2]}{client.creationDate[3]}</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <p className={`${handleIconBg(client.clientId) === "+$" ? "text-green-600" : "text-red-600" } font-bold text-xl md:text-2xl`}>R$ {client.value}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="flex flex-row gap-5 w-full justify-center">
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

export default SalesListComponent