import React from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../data/dummy'

const Navbar = () => {
  return (
    <div className="flex flex-row justify-center md:justify-start gap-6 p-5">
        {links.map( (i, index) => (
            <NavLink key={index} to={`/${i.name.toLowerCase()}`}>
                <div className="flex flex-col p-4 items-center">
                    <div>
                        {i.icon}
                    </div>
                    <div className="text-blue-400">
                        {i.name}
                    </div>
                </div>
            </NavLink>
        ))}

    </div>
  )
}

export default Navbar