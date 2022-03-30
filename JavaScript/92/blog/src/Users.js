// import React, { useState, useEffect } from 'react'
import User from "./User"

export default function Users({users, userClicked, setSubtitle}) {
    const mappedUsers = users.map(user => {
        return {
            name: user.name,
            id: user.id,
            email: user.email,
            web: user.website,
            company: user.company.name,
            comCatch: user.company.catchPhrase,
            comBs: user.company.bs
        }
    });
    return (
        <div className="w-full gap-2 grid auto-cols-auto grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mappedUsers.map(user => {
                return (
                    <User key={user.id} user={user} userClicked={userClicked}/>
                )
            })}
        </div>
    )
}
