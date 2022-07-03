<script>
import { get } from 'svelte/store';

  import { selectedConversation } from './stores';
  import { getMessageTimeDayOrDate } from './utils';
  import { timeDiff, getGroupTyping } from './utils';
  export let conversation;
  $: lastMessageDatetime = conversation?.messages[0]?.datetime;
  $: datetime =  getMessageTimeDayOrDate(new Date(lastMessageDatetime));
  $: lastMsg = conversation?.messages[0]?.text || '';
  $: typingUsers = conversation.type === 'group' ? getGroupTyping(conversation.groupUsers) : undefined;
  let selectedId;

  selectedConversation.subscribe(v => {
    selectedId = v?.conversationId;
  })

  const click = () => {
    selectedConversation.set(conversation);
  };
</script>

<div on:click={click} class="conversation {conversation.conversationId === selectedId ? 'selected' : ''}">
  <img src="../images/no-user.jpg" alt="user-avatar">
  <div class="conversation-info">
    <div class="nameTime">
      <p class="user-name">{conversation.otherUserName || conversation.groupName}</p>
      <p>{datetime}</p>
    </div>
    
    {#if conversation.lastTypingEmit && timeDiff(conversation.lastTypingEmit) < 5}
      <p class="typing">typing...</p>
    {:else if conversation.type === 'group' && typingUsers.length > 0}
      <p class="typing">
        <span class="usersTyping">{typingUsers.join(', ')}</span>
        {typingUsers.length === 1 ? 'is': 'are'} typing...
      </p>
    {:else}
      <p class="last-msg">{lastMsg}</p>
    {/if}
  </div>
</div>

<style>
  .conversation {
    display: block;
    height: 80px;
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;
    padding: 0 10px;
    border: none;
    cursor: pointer;
    background-color: rgb(100, 100, 100)
  }

  * {
    user-select: none;
  }

  .selected {
    background-color: rgb(80, 80, 80);
  }

  .conversation:not(.selected):hover {
    background-color: rgb(90, 90, 90);
  }

  img {
    border-radius:  50%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  .nameTime {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .conversation-info {
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: rgb(228, 228, 228);
    font-size: 12px;
    gap: 5px;
  }

  p {
    margin: 0px;
  }

  .user-name {
    font-size: 16px;
    color: white;
  }

  .last-msg {
    font-size: 14px;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.4);
  }

  .usersTyping {
    display: inline-block;
    overflow:hidden;
    max-width:100px;
    position:relative;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .typing span {
    vertical-align: top;
  }

  .typing {
    font-size: 16px;
    display: inline-block;
    vertical-align: top;
    color: rgb(72, 210, 72);
  }

</style>