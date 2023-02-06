import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { UseStateContext } from '../contexts/ContextProvider'
import IconList from './IconList'

const SalesListComponent = () => {


  const [pagination, setPagination] = useState(0)
  const [list, setList] = useState([])
  const [clients, setClients] = useState([])
  const [saleList, setSaleList] = useState([])


  useEffect(()=>{
    Axios.get("https://vendinhaapi.azurewebsites.net/api/saleList")
    .then((resp)=> {
      setSaleList(resp.data)
    })
  },[])

  useEffect(()=>{
    setList([])
    setClients([])
    for (let cont = 0; cont < 5; cont++) {
        if(pagination + cont < saleList.length){
                setList((oldArray)=>[...oldArray, saleList[pagination+cont]])
                if (cont === saleList.length - pagination ) break
        }
    }
  },[pagination, saleList])

  useEffect(()=>{
    list?.map((i)=>getClient(i.clientId))
  },[list])

  const getClient = (id)=>{
    Axios.get(`https://vendinhaapi.azurewebsites.net/api/clients/${id}`)
    .then((resp)=>{
        setClients((old)=>[...old, resp.data])
    })
  }

  const handleValue = (id)=>{
    for (let cont = 0; cont < list.length; cont++) {
        if(list[cont].clientId === id){
            return list[cont].value
        }
    }
  }

  const handleDate = (id)=>{
    for (let cont = 0; cont < list.length; cont++) {
        if(list[cont].clientId === id){
            return list[cont].creationDate
        }
    }
  }

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

  return (
    <div className="flex w-full px-5 flex-col ">
        <div className="flex flex-col gap-3">
            { clients?.map((client,index)=>{
                var aux = handleIconBg(client.id)
                return(
                    <div className="flex flex-row gap-3 items-center" key={index}>
                        <IconList name= { aux } />
                        <div className="flex flex-col w-1/4">
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sm text-bold  text-gray-400">Cliente:</h1>
                                <p className="text-sm">{client.name}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sm text-bold  text-gray-400">Valor total:</h1>
                                <p className="text-sm">{handleValue(client.id)}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <h1 className="text-sm text-bold  text-gray-400">Data:</h1>
                                <p className="text-sm">{handleDate(client.id)}</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <p className={`${handleIconBg === "+$" ? "text-green-600" : "text-red-600" } font-bold text-2xl`}>R$ {handleValue(client.id)}</p>
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
                setPagination((old)=>old+5 <= saleList.length ? old+5 : old )
            }}

            >
                {">"}
            </button>
        </div>
    </div>
  )
}

export default SalesListComponent