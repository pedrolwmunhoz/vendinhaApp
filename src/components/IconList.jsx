import React, { useEffect, useState} from 'react'

const IconList = (props) => {

    const [background, setBackground] = useState("")
    const [fontColor, setFontColor] = useState("")

    useEffect(()=>{
        if(props.name === "-$"){
            setBackground("bg-red-200")
            setFontColor("text-red-600")
        }else if(props.name === "+$"){
            setBackground("bg-green-200")
            setFontColor("text-green-600")
        }else{
            setBackground("bg-cyan-200")
            setFontColor("text-cyan-600")
        }
    },[props.name])

  return (
    <div className={`py-3 rounded-2xl text-center font-medium ${background} ${fontColor} text-2xl w-1/4 md:w-1/6`}>{props.name}</div>
  )
}

export default IconList