<script>
  import Speech from "./Speech.svelte";
  import UserJoin from './UserJoin.svelte';
  import MdSend from 'svelte-icons/md/MdSend.svelte';
  import { selectedConversation, userInfo, userConversations, chatUsers } from './stores';
  import ConversationInfo from './ConversationInfo.svelte';

  export let socket;

  let user;
  let theChatUsers = [];
  let conversations = [];
  let conversationInfo;

  chatUsers.subscribe(v => theChatUsers = v);
  userInfo.subscribe(v => user = v)
  userConversations.subscribe(v => conversations = v);

  let conversation;
  let messages = [];
  let messageInput = '';
  let lastTypingEmit;

  const scroll = () => {
    const speechWrapper = document.querySelector('.speech-wrapper');
    if(speechWrapper) {
      speechWrapper.scrollTop = speechWrapper.scrollHeight;
    }
  }

  selectedConversation.subscribe(v => {
    messageInput = '';
    lastTypingEmit = undefined;
    conversation = v;

    if(!v) {
      return;
    }
    let theUser;
    if(v.type === 'pm') {
      theUser = theChatUsers.find(u => {
        return u.id === v.otherUserId
      });
    }

    conversationInfo = {
      type: v.type,
      conversationId: v.conversationId
    }

    if(v.type === 'pm') {
      conversationInfo.otherUser = theUser;
    } else if(v.type === 'group') {
      conversationInfo.groupId = v.groupId;
      conversationInfo.groupName = v.groupName;
      conversationInfo.groupUsers = v.groupUsers;
    }

    conversationInfo = conversationInfo;
    messages = v.messages || [];
    setTimeout(scroll, 10);
  })

  const keypress = () => {
    if(lastTypingEmit) {
      const now = new Date();
      const diffSec = (now.getTime() - lastTypingEmit.getTime()) / 1000;
      if(diffSec < 3) {
        return;
      }
    }

    lastTypingEmit = new Date();
    const conv = {
      type: conversation.type,
      conversationId: conversation.conversationId
    }

    if(conv.type === 'group') {
      conv.groupId = conversation.groupId
    } else if(conv.type === 'pm') {
      conv.otherUserId = conversation.otherUserId
    }

    socket.emit('typing', conv);
  }

  const sendMessage = () => {
    if(!messageInput) {
      return;
    }

    if(conversation.newConversation) {
      const message = {
        text: messageInput,
        otherUserId: conversation.otherUserId
      }
      socket.emit('newPmConversation', message, (res, conversation) => {
        if(res) {
          alert(res);
        }

        if(!conversation) {
          return;
        }

        conversations.unshift(conversation);
        userConversations.set(conversations);
        selectedConversation.set(conversation);
      });

      return;
    }

    const newMessage = {
      text: messageInput,
      type: 'speech',
      conversationType: conversation.type,
      conversationId: conversation.conversationId
    }

    if(newMessage.conversationType === 'pm') {
      newMessage.otherUserId = conversation.otherUserId;
    } else if(newMessage.conversationType = 'group') {
      newMessage.groupId = conversation.groupId;
    } else {
      throw Error('unknown type');
    }

    socket.emit('message', newMessage, res => {
      if(res) {
        alert(res);
      }
    });

    messageInput = '';

  }
 
</script>

<div class="messages">
  <div class="top">
    <ConversationInfo conversationInfo={conversationInfo}></ConversationInfo>
  </div>
  <div class="speech-wrapper">
    {#each messages || [] as message (message.id) }
      {#if message.type === 'speech'}
        <Speech message={message}></Speech>
      {:else if message.type === 'login'}
        <UserJoin message={message.text}></UserJoin>
      {/if}
    {/each}
  </div>
  <form on:submit|preventDefault={sendMessage}>
    <input on:keypress={keypress} bind:value={messageInput}>
    <button class="icon {messageInput.length >= 1 ? 'visible': 'not-visible'}"><MdSend></MdSend></button>
  </form>
</div>

<style>

  .messages {
    display: flex;
    flex-direction: column;
    background: url('../images/background.jpg');
    font-size: 16px;
    height: 100vh;
    width: 100%;
  }

  /* .messages::-webkit-scrollbar {
    display: none;
  } */

  .speech-wrapper {
    overflow-y: scroll;
    display: flex;
    gap: 20px;
    flex-direction: column-reverse;
    transition: all 300ms;
    height: 100%;
    width: 100%;
    padding: 2em;
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

  .icon {
    background: none;
    border: none;
    color: #00a24c;
    width: 45px;
    height: 45px;
    overflow: hidden;
    padding: 0;
    transition: all 350ms;
  }

  form {
    background-color: #0e6668;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-items: center;
    padding: 10px;
  }

  .visible {
    width: 50px;
  }

  .not-visible {
    width: 0;
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

</style>