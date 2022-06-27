<script>
  import { selectedConversation } from './stores';
  export let conversation;
  $: d = new Date(conversation.lastMessageDatetime);
  $: datetime = d.toLocaleDateString();
  $: lastMsg = conversation?.messages[0]?.text || ''
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
    <div class="last-msg">
      <p>{lastMsg}</p>
    </div>
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
    color: rgb(186, 186, 186);    
  }

  .last-msg p {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.4);
  }


</style>