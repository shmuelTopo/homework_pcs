import React from 'react'

export default function User({user, userClicked}) {
    return (
        <div onClick={() => userClicked(user.id)} key={user.id} userid={user.id} className="userDetails userDetails text-center bg-base-content/20 hover:bg-base-content/30 p-4 rounded-xl cursor-pointer"> 
            <div className="block text-2xl italic">{user.name}</div>
            <p className=" link font-bold">www.{user.web}</p>
            <div className='bold'>{user.email}</div>
            <div className="text-xs italic">
                <div>{user.company}</div>
                <div>{user.comCatch}</div>
                <div>{user.comBs}</div>
            </div> 
        </div>
    )
}
