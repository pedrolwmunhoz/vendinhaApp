import React, { useState } from 'react'
import { UseStateContext } from '../contexts/ContextProvider'
import Axios from 'axios'

const SaleModal = () => {

  const { saleModalActive, setSaleModalActive, clientId } = UseStateContext()

  const [erro, setErro] = useState(false)
  const [sucess, setSucess] = useState(false)


  const handleAddSale = ()=>{
    let value = document.getElementById("value-input").value
    let isPaid

    if(document.getElementById("paid-input").checked){
    isPaid = true
    }else isPaid = false

    const date = new Date()

    Axios.post("https://vendinhaapi.azurewebsites.net/api/saleList", { clientId: clientId, value: value, isPaid: isPaid, creationDate: date })
    .then((resp)=> {
      if(resp.status === 200) setSucess(true)
      else setErro(true)
    })
  }

  return (
    <div id="myModal" className={`${saleModalActive ? "" : "hidden" } fixed flex items-center justify-center inset-0 w-full h-full overflow-auto bg-gray-400 bg-opacity-30`}>
        <div className="bg-white mx-4 p-10 w-9/12 flex justify-center flex-col">
            <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-4 items-center">
                    <p>Valor:</p>
                    <input id='value-input' className="p-1 border-gray-300 border-2 rounded-xl border-solid" />
                </div>
                <div className="flex flex-row gap-4">
                    <p>Pago:?</p>
                    <input id="paid-input" type="checkbox" />
                </div>
                <p className={`text-red-800 bg-red-400 border-2 border-gray-400 border-solid ${erro ? "" : "hidden"}`}>Erro</p>
                <p className={`text-green-800 bg-green-400 border-2 border-gray-400 border-solid  ${sucess ? "" : "hidden"}`}>Venda adicionada</p>
                <button onClick={()=>handleAddSale()} className="py-2 px-5 bg-green-400 rounded-xl">Adicionar venda</button>
                <button onClick={()=>{
                    setSaleModalActive(false)
                    setErro(false)
                    setSucess(false)
                    }} className="py-2 px-5 bg-red-400 rounded-xl">Fechar</button>
            </div>
        </div>
    </div>
  )
}

export default SaleModal