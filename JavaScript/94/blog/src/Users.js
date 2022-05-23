import React, { useState, useEffect } from 'react'
import User from "./User"

export default function Users({userClicked, setSubtitle}) {
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        (async function () {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const theUsers = await response.json();

            setUsers(theUsers.map(user => {
                return {
                    name: user.name,
                    id: user.id,
                    email: user.email,
                    web: user.website,
                    company: user.company.name,
                    comCatch: user.company.catchPhrase,
                    comBs: user.company.bs
                }
            }));

        })();

    }, []);

    return (
        <div className="w-full gap-2 grid auto-cols-auto md:grid-cols-2 lg:grid-cols-3">
            {users.map(user => {
                return (
                    <User key={user.id} user={user} userClicked={userClicked}/>
                )
            })}
        </div>
    )
}
