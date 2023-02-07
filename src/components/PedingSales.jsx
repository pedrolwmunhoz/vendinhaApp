import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { UseStateContext } from '../contexts/ContextProvider'
import IconList from './IconList'

const PedingSales = () => {
  const { saleList } = UseStateContext()

  const [pagination, setPagination] = useState(0)
  const [list, setList] = useState([])
  const [clients, setClients] = useState([])

  useEffect(()=>{
    setList([])
    for (let cont = 0; cont < 5; cont++) {
        if ((cont + pagination) === saleList.length ) break
        if(!saleList[pagination+cont].isPaid){
            setList((old)=>[...old, saleList[pagination+cont]])
        }
    }
  },[pagination, saleList])

  useEffect(()=>{
      Axios.get(`https://vendinhaapi.azurewebsites.net/api/clients/`)
      .then((resp)=>{
          setClients(resp.data)
      })
  },[])

  const handleName = (id)=>{
    for (let cont = 0; cont < clients.length; cont++) {
        if(clients[cont].id === id){
            return clients[cont].name
        }
    }
  }

  const handleValue = (id)=>{
    for (let cont = 0; cont < list.length; cont++) {
        if(list[cont].clientId === id){
            if(!list[cont].isPaid){
                return list[cont].value
            }
        }
    }
  }

  const handleDate = (id)=>{
    for (let cont = 0; cont < list.length; cont++) {
        if(list[cont].clientId === id){
            if(!list[cont].isPaid){
                return list[cont].creationDate
            }
        }
    }
  }

  return (
    <div className="flex w-full px-5 md:w-1/2 flex-col">
        <div className="flex flex-col gap-3">
            { list?.map((list,index)=>{
                return(
                    <div className="flex flex-row gap-3 items-center" key={index}>
                        <IconList name= "-$" />
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sm text-bold  text-gray-400">Cliente:</h1>
                                <p className="text-sm">{handleName(list.clientId)}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sm text-bold  text-gray-400">Valor total:</h1>
                                <p className="text-sm">{handleValue(list.clientId)}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sm text-bold  text-gray-400">Data:</h1>
                                <p className="text-sm">{handleDate(list.clientId)}</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <p className={"text-red-600 font-bold text-2xl"}>R$ {list.value}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="flex flex-row gap-5 w-full justify-center mb-14">
            <button onClick={()=>{
                    pagination === 0 ? setPagination(0) : setPagination((old)=>old-5)
                }}
            >
                {"<"}
            </button>
            <button onClick={()=>{
                setPagination((old)=>old+5 <= saleList.length ? old+5 : old )
            }}

            >
                {">"}
            </button>
        </div>
    </div>
  )
}

export default PedingSales