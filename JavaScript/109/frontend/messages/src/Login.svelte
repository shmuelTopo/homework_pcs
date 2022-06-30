<script>
  export let login;
  import { userInfo } from './stores';
  import PersonFill from "svelte-bootstrap-icons/lib/PersonFill.svelte";
  import LockFill from "svelte-bootstrap-icons/lib/LockFill.svelte"; 
	
  const submit = async () => {
    const loginInfo = {
      username,
      password,
      method
    }

    if(method === 'signup') {
      loginInfo.firstName = firstName;
      loginInfo.lastName = lastName;
    }

    const response = await fetch("http://localhost/login", {
      method: "POST",
      credentials: "include",
      mode: 'cors',
      body: JSON.stringify(loginInfo),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })

    const data = await response.text();

    if(response.ok) {
      errorText = '';
      const dataObject = JSON.parse(data);

      userInfo.set(dataObject);

      login();

      if(method === 'signup') {
        method = 'login';
        window.location.reload();
      }
    } else {
      errorText = data || 'Something went wrong';
    }
  }

  const changeMethod = () => {
    method = method === 'login' ? 'signup' : 'login';
    username = '';
    password = '';
    firstName = '';
    lastName = '';
  }

  let errorText = '';
  let username = '';
  let password = '';
  let firstName = '';
  let lastName = '';
  let method = 'login';
</script>

<main>
  <div class="center">
    <h1>{method === 'login' ? 'Login' : 'Sign up'}</h1>
    <form autocomplete="off" on:submit|preventDefault={submit}>
      {#if method === 'signup'}
        <div class="firstLastName">
          <div class="text_field">
            <input placeholder=" "  bind:value="{firstName}" required id="first" minlength="4" type="text">
            <span></span>
            <label for="first">
              First Name
            </label>
          </div>
          <div class="text_field">
            <input placeholder=" "  bind:value="{lastName}" required id="last" minlength="4" type="text">
            <span></span>
            <label for="last">Last Name</label>
          </div>
        </div>
      {/if}
      <div class="text_field">
        <input placeholder=" " on:input="{() => errorText=''}" bind:value="{username}" required minlength="4" id="username" type="text">
        <span></span>
        <label for="username">          
          <PersonFill></PersonFill>
          Username
        </label>
        <div class="error">{errorText}</div>
      </div>
      <div class="text_field">
        <input placeholder=" "  bind:value="{password}" required id="password" minlength="4" type="password">
        <span></span>
        <label for="password">
          <LockFill></LockFill>
          Password
        </label>
      </div>
      <input type="submit" value="{method === 'login' ? 'Login': 'Sign up'}">
      <div class="signup">
        {method === 'login' ? 'not': 'already'} a member? 
        <button type="button" on:click={changeMethod} class="link-primary">
          {method === 'login' ? 'Sign up' : 'Login'}
        </button>
      </div>
    </form>
  </div>
</main>


<style>
  main {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    position: relative;
    background: #5959ff
  }
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    max-height: 80vh;
    max-width: 400px;
    background: #eeeeee;
    border-radius: 10px;
    overflow: auto;
  }

  .center h1 {
    text-align: center;
    padding: 20px;
    margin: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid silver;
  }

  .center form {
    padding: 0 40px;
  }

  form .text_field {
    position: relative;
    border-bottom: 2px solid #adadad;
    margin: 20px 0;
    transition: all .5s;
  }

  input {
    width: 100%;
    padding: 0 5px;
    height: 40px;
    font-size: 16px;
    border: none;
    background: none;
    outline: none;
  }

  .text_field label {
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    font-size: 16px;
    user-select: none;
    pointer-events: none;
    transition: .5s;
  }

  .firstLastName {
    display: flex;
    gap: 5px;
    margin: 0;
  }

  .firstLastName .text_field {
    margin: 0;
  }

  .text_field span::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0;
    height: 2px;
    background: #2691d9;
    transition: .5s;
  }

  .text_field input:focus ~ label,
  .text_field input:not(:placeholder-shown) ~ label {
    top: -5px;
    color: #2691d9;
  }

  .text_field input:focus ~ span::before,
  .text_field input:not(:placeholder-shown) ~ span::before {
    width: 100%;
  }

  input[type="submit"] {
    width: 100%;
    height: 50px;
    border: 1px solid;
    background: #2691d9;
    border-radius: 25px;
    font-size: 18px;
    color: #e9f4fb;
    font-weight: 700;
    cursor: pointer;
    outline: none;
  }

  input[type="submit"]:hover {
    border-color: #2691d9;
    transition: .5s;
  }

  .signup {
    margin: 30px 0;
    text-align: center;
    font-size: 16px;
    color: #666666;
  }

  .signup button {
    color: #2691d9;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  .signup button:hover {
    color: #2691d9;
    cursor: pointer;
    text-decoration: underline;
  }

  .error {
    color: #ff4a4a;
    font-weight: 300;
    position:absolute;
    top: 42px;
    right: 5px;
  }
</style>









<!-- 

<div class="form-wrapper">
  <h2>Login</h2>
  <form on:submit|preventDefault="{submit}">
    <input placeholder="username" bind:value={username} required minlength="2">
    <div class="error">{errorText}</div>
    <input placeholder="First Name" bind:value={firstName} required minlength="2" maxlength="20">
    <input placeholder="Last Name" bind:value={lastName} required minlength="2" maxlength="20">
    <input type="password" placeholder="password" bind:value={password} required minlength="2">
    <div class="buttons">
      <button class="login" on:click={() => method = 'login'}>Login</button>
      <button class="signup" on:click={() => method = 'signup'}>Sign Up</button>
    </div>
  </form>
</div>




<style>
  .form-wrapper {
    background-color: #465876;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    gap: 2em;
    height: 100%;
    width: 100%;
  }

  form {
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2em;
    position: relative;
  }

  .error {
    color: #ff8787;
    position:absolute;
    top: 65px;
    left: 5px;
  }

  h2 {
    font-weight: 300;
    font-size: 3em;
    margin: 0;
    text-align: center;
    color: rgb(211, 211, 211);
  }

  input {
    width: 100%;
    display: block;
    box-sizing: border-box;
    outline: none;
    height: 60px;
    line-height: 60px;
    padding: 0 0 0 10px;
    margin: 0;
    color: #d5d5d5;
    border: 1px solid #c2c0ca;
    position: relative;
    background: 0, 0;
  }

  .buttons {
    display: flex;
    width: 100%;
    gap: 1em;
  }

  button {
    border: none;
    display: block;
    width: 100%;
    color: #dedede;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 18px;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    height: 50px;
  }

  .login {
    background-color: rgb(105, 105, 255);
  }

  .login:hover {
    background-color: rgb(79, 79, 255);
  }

  .signup {
    background-color: rgb(0, 158, 0)
  }

  .signup:hover {
    background-color: rgb(0, 147, 0)
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #d5d5d5;
      opacity: 0.3; /* Firefox */
    }
  
</style> -->
