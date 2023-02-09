import React, { useEffect, useState } from 'react'
import { UseStateContext } from '../contexts/ContextProvider'
import Axios from 'axios'

const SaleModal = () => {

  const { saleModalActive, setSaleModalActive, clientId } = UseStateContext()

  const [erro, setErro] = useState(false)
  const [erroPending, setErroPending] = useState(false)
  const [sucess, setSucess] = useState(false)

  const [saleList, setsaleList] = useState([])
  const [getList, setGetList] = useState(0)


    const valideAdd = ()=>{

        if( document.getElementById("paid-input").checked ) {
            handleAddSale()
        }else{
            setErroPending(false)
            setSucess(false)
            setErro(false)
            if(getList === 1){
                setGetList(0)
                setErroPending(true)
            }else{
                setGetList((old)=>old+1)
                let contador = 0
                for (let cont = 0; cont < saleList.length; cont++) {
                    if(saleList[cont].clientId === clientId){
                        if(!saleList[cont].isPaid){
                            contador+=1
                        }
                        console.log(contador)
                    }
                }
        
                if(contador === 0){
                    handleAddSale()
                }else{
                    setErro(false)
                    setSucess(false)
                    setErroPending(true)
                }
            }
        }

    }

  useEffect(()=>{
    Axios.get("https://vendinhaapi.azurewebsites.net/api/saleList")
    .then((resp)=>{
        setsaleList(resp.data)
    })
 
  },[getList])

  const handleAddSale = ()=>{

    let value = document.getElementById("value-input").value
    let isPaid

    if(document.getElementById("paid-input").checked){
    isPaid = true
    }else isPaid = false

    const date = new Date()

    Axios.post("https://vendinhaapi.azurewebsites.net/api/saleList", { clientId: clientId, value: value, isPaid: isPaid, creationDate: date })
    .then((resp)=> {
        if(resp.status === 200){
            setSucess(true)
            setErro(false)
            setErroPending(false)
        }
    })
    .catch((resp)=>{
        if(resp.response.status === 200){
            setSucess(true)
            setErro(false)
            setErroPending(false)
        }
        else {
            setErro(true)
            setSucess(false)
            setErroPending(false)
        }
    })
  }

  return (
    <div id="myModal" className={`${saleModalActive ? "" : "hidden" } fixed flex items-center justify-center inset-0 overflow-auto bg-gray-400 bg-opacity-30`}>
        <div className="bg-white mx-4 p-10 flex justify-center flex-col">
            <div className="flex w-full justify-center">
                <p className={`text-green-400 border-2 ${sucess ? "" : "hidden"}`}>Venda adicionada</p>
                <p className={`text-red-400 ${erro ? "" : "hidden"}`}>Erro</p>
                <p className={`text-red-400 mb-4 ${erroPending ? "" : "hidden"}`}>Erro: Já existe uma divida pendente para este usuário</p>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-4 items-center">
                    <p>Valor:</p>
                    <input id='value-input' className="p-1 border-gray-300 border-2 rounded-xl border-solid" />
                </div>
                <div className="flex flex-row gap-4">
                    <p>Pago:?</p>
                    <input id="paid-input" type="checkbox" />
                </div>
                <button onClick={()=> valideAdd()}
                    className="py-2 px-5 bg-green-400 rounded-xl">Adicionar venda</button>
                <button onClick={()=>{
                    setSaleModalActive(false)
                    setErro(false)
                    setSucess(false)
                    setErroPending(false)
                    }} className="py-2 px-5 bg-red-400 rounded-xl">Fechar</button>
            </div>
        </div>
    </div>
  )
}

export default SaleModal