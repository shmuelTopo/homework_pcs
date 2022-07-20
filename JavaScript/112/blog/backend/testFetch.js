const express = require('express');

const userDetails = {
  email: "esti@gmail.com",
  password: "12345678",
  method: "login"
};


// (async function() {
//   const response = await fetch(`http://localhost:8000/login`, {
//     method: "POST",
//     credentials: "include",
//     mode: 'cors',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userDetails)
//   })

//   if(response.ok) {
//     const theUser = await response.json()
//     console.log(theUser);
//   }
// })();

//make a post request to post a new blog a post in a loop of 10 times
// (async function() {
//   for(let i = 1; i <= 10; i++) {
//     const response = await fetch(`http://localhost:8000/posts`, {
//       method: "POST",
//       credentials: "include",
//       mode: 'cors',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title: `post ${i}`,
//         body: `body ${i}`,
//       })
//     })

//     if(response.ok) {
//       const thePost = await response.json()
//       console.log(thePost);
//     }
//   }
// })();

const i = 1;
(async function() {
  const response = await fetch(`http://localhost:8000/posts`, {
    method: "POST",
    credentials: "include",
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `post ${i}`,
      body: `body ${i}`,
    })
  })

  if(response.ok) {
    const thePost = await response.json()
    console.log(thePost);
  }
})();