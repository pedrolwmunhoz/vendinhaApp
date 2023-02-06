import { IoHome } from "react-icons/io5"
import { FaUsers } from "react-icons/fa"
import { GiPriceTag } from "react-icons/gi"
import { useEffect, useState } from "react"
import { UseStateContext } from "../contexts/ContextProvider"

export const links = [
        {
            name: 'Inicio',
            icon: <IoHome className="text-blue-500" size={25} />,
        },
        {
            name: 'Clientes',
            icon: <FaUsers className="text-blue-500" size={25} />,
        },
        {
            name: 'Vendas',
            icon: <GiPriceTag className="text-blue-500" size={25} />,
        },
]

export const month = ()=> {

    const date = new Date()

    if(date.getMonth() === 1){
      return "Janeiro"
    }
    else if(date.toDateString() === 2){
      return "Fevereiro"
    }
    else if(date.toDateString() === 3){
      return "Março"
    }
    else if(date.toDateString() === 4){
      return "Abril"
    }
    else if(date.toDateString() === 5){
      return "Maio"
    }
    else if(date.toDateString() === 6){
      return "Junho"
    }
    else if(date.toDateString() === 7){
      return "Julho"
    }
    else if(date.toDateString() === 8){
      return "Agosto"
    }
    else if(date.toDateString() === 9){
      return "Setembro"
    }
    else if(date.toDateString() === 10){
      return "Outubro"
    }
    else if(date.toDateString() === 11){
      return "Novembro"
    }
    else if(date.toDateString() === 12){
      return "Dezembro"
    }
  }



