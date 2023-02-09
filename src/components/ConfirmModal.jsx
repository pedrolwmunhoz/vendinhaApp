import React from 'react'
import { UseStateContext } from '../contexts/ContextProvider'
import Axios from 'axios'

const ConfirmModal = () => {

  const { confirmModalActive, setConfirmModalActive, clientId } = UseStateContext()

  const handleDelete = ()=>{

    Axios.delete(`https://vendinhaapi.azurewebsites.net/api/clients/${clientId}`)
    .then((resp)=> {
        console.log(resp)
    })
    .catch((resp)=>{

    })
  }

  return (
    <div id="myModal" className={`${confirmModalActive ? "" : "hidden" } fixed flex items-center justify-center inset-0 overflow-auto bg-gray-400 bg-opacity-30`}>
        <div className="bg-white mx-4 p-10 flex justify-center flex-col">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl">Tem certeza que deseja exluir?</h1>
                <div className="flex flex-row gap-2 justify-center">
                    <button className="bg-green-400 px-4 py-2 text-green-800" onClick={()=>{
                        handleDelete()
                        setConfirmModalActive(false)
                    }}>Sim</button>
                    <button className="bg-red-400 px-4 py-2 text-red-800" onClick={()=>setConfirmModalActive(false)}>Não</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal