<script>
import { handle_promise } from "svelte/internal";


  export let socket;
  export let user = { loggedIn: false };

  let errorText = '';
	const submit = () => {
    user.name = name;
    user.password = password;
    if(method === 'signup'){
      socket.emit('signup', {name: user.name, password: user.password}, (res) => {
        if(res) {
          errorText = res;
          return user.loggedIn = false;
        }
        user.loggedIn = true;
      });
    }
  }

  let name = '';
  let password = '';
  let method = 'login';
</script>

<div class="form-wrapper">
  <h2>Login</h2>
  <form on:submit|preventDefault="{submit}">
    <input placeholder="username" bind:value={name} required minlength="2">
    <div class="error">{errorText}</div>
    <input type="password" placeholder="password" bind:value={password} required minlength="2">
    <div class="buttons">
      <button class="login" on:click={() => method = 'login'}>Login</button>
      <button class="signup" on:click={() => method = 'signup'}>Sign Up</button>
    </div>
  </form>
</div>



<style>
  .form-wrapper {
    min-width: 300px;
    width: 50%;
    background-color: #465876;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2em;
    gap: 2em;
    border-radius: 5px;
  }

  form {
    width: 100%;
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
    display: block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    height: 60px;
    line-height: 60px;
    border-radius: 4px;
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
  
</style>
