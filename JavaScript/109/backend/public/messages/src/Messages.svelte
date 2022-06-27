<script>
  import Speech from "./Speech.svelte";
  import UserJoin from './UserJoin.svelte'
  import MdSend from 'svelte-icons/md/MdSend.svelte'

  export let user;
  export let socket;
  let messages = [];

  socket.on("message", message => {
    messages = [...messages, message];
    (messages);
  });

  const sendMessage = () => {
    const newMessage = {
      text: messageInput,
      user,
      time: new Date().getTime()
    }
    socket.emit('message', newMessage);
    messageInput = '';
  }
  let messageInput = '';
</script>


<div class="messages">
  <div class="speech-wrapper">
    {#each messages.sort((a, b) => a.id - b.id).reverse() as message (message.id) }
      {#if message.type === 'speech'}
        <Speech message={message} self={message.user.name === user.name}></Speech>
      {:else}
        <UserJoin userName={message.userName}></UserJoin>
      {/if}
    {/each}
  </div>
  <form on:submit|preventDefault={sendMessage}>
    <input bind:value={messageInput}>
    <button class=icon><MdSend></MdSend></button>
  </form>
</div>



<style>
  .icon {
    background: none;
    border: none;
    color: #00a24c;
    width: 50px;
    height: 50px;
  }

  form {
    background-color: #0e6668;
    display: grid;
    gap: 5px;
    grid-template-columns: 1fr 50px;
    align-items: center;
    justify-items: center;
    padding: 10px;
  }

  input {
    background-color: #ffffff26;
    border: none;
    color: white;
    border-radius: 10px;
    height: 40px;
    width: 100%;
  }

  input:focus {
    outline: none;
  }

  input, button {
    margin: 0;
  }

  .messages {
    display: flex;
    flex-direction: column;
    background: url('../images/background.jpg');
    font-size: 16px;
    max-height: 100%;
    overflow-y: scroll;
  }

  .messages::-webkit-scrollbar {
    display: none;
  }

  .speech-wrapper {
    border: 1px solid black;
    height: 100%;
    padding: 30px 40px;
    gap: 20px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
  }

  .speech-wrapper::-webkit-scrollbar {
    width: .3em;
  }
  
  .speech-wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  .speech-wrapper::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

</style>