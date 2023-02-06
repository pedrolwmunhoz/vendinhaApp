import React, { useState } from 'react'
import { UseStateContext } from '../contexts/ContextProvider'
import Axios from 'axios'

const ClientModal = () => {

  const { clientModalActive, setClientModalActive } = UseStateContext()

  const [erro, setErro] = useState(false)
  const [sucess, setSucess] = useState(false)


  const handleAddSale = ()=>{
    let name = document.getElementById("name-input").value
    let cpf = document.getElementById("cpf-input").value
    let email = document.getElementById("email-input").value
    let birthDate = document.getElementById("birthDate-input").value

    Axios.post("https://vendinhaapi.azurewebsites.net/api/clients", { name: name, cpf: cpf, email: email, birth_date: birthDate })
    .then((resp)=>{
        if(resp.status === 200) setSucess(true)
        else setErro(true)
    })
  }

  return (
    <div id="myModal" className={`${clientModalActive ? "" : "hidden" } fixed flex items-center justify-center inset-0 w-full h-full overflow-auto bg-gray-400 bg-opacity-30`}>
        <div className="bg-white mx-4 p-10 w-9/12 flex justify-center flex-col">
            <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-4 items-center">
                    <p>Nome:</p>
                    <input id='name-input' type="text" className="p-1 border-gray-300 border-2 rounded-xl border-solid" />
                </div>
                <div className="flex flex-row gap-4">
                    <p>Cpf:</p>
                    <input id="cpf-input" type= "text" className="p-1 border-gray-300 border-2 rounded-xl border-solid" />
                </div>
                <div className="flex flex-row gap-4">
                    <p>Email:</p>
                    <input id="email-input" type= "email" className="p-1 border-gray-300 border-2 rounded-xl border-solid" />
                </div>
                <div className="flex flex-row gap-4">
                    <p>Data Nascimento:</p>
                    <input id="birthDate-input" type= "date"  className="p-1 border-gray-300 border-2 rounded-xl border-solid"/>
                </div>
                <p className={`bg-red-400 text-red-800 border-2 border-gray-400 border-solid ${erro ? "" : "hidden"}`}>Erro</p>
                <p className={`bg-green-400 text-green-800 border-2 border-gray-400 border-solid  ${sucess ? "" : "hidden"}`}>Cliente adicionado</p>
                <button onClick={()=>{
                    handleAddSale()
                    }} className="py-2 px-5 bg-green-400 rounded-xl">Adicionar Cliente</button>
                <button onClick={()=>{
                    setClientModalActive(false)
                    setErro(false)
                    setSucess(false)
                    }} className="py-2 px-5 bg-red-400 rounded-xl">Fechar</button>
            </div>
        </div>
    </div>
  )
}

export default ClientModal