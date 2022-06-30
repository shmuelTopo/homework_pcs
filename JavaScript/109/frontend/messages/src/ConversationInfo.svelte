<script>
  import { onDestroy } from "svelte";
  import { getLastseenMessage } from './utils';
  import { chatUsers } from './stores';

  export let conversationInfo;
  let lastseenMessage = '';
  
  chatUsers.subscribe(() => {
    lastseenMessage = getLastseenMessage(conversationInfo?.otherUser?.lastseen);
  })

  let interval;
  $: if(conversationInfo?.type === 'pm') {
    updateLastseen();
    interval = setInterval(updateLastseen, 5000);
  } else {
    clearInterval(interval);
  }

  onDestroy(() => clearInterval(interval));

  function updateLastseen() {
    if(conversationInfo.otherUser){
      lastseenMessage = getLastseenMessage(conversationInfo?.otherUser.lastseen);
    }
  }

</script>

{#if conversationInfo}
  {#if conversationInfo.type === 'pm'}
    <div class="conversationInfo">
      <img src="{conversationInfo.otherUser.avatar || '../images/no-user.jpg'}" alt="avatar"/>
      <div class="userInfo">
        <p class="name">{conversationInfo.otherUser?.username}</p>
        <p class="lastseen">
          {lastseenMessage}
        </p>
      </div>
    </div>

  {:else if conversationInfo.type === 'group'}
  
    <div class="conversationInfo">
      <img src="{conversationInfo.groupAvatar || '../images/no-user.jpg'}" alt="avatar"/>
      <div class="userInfo">
        <p class="name">{conversationInfo.groupName}</p>
        <p class="groupUsers">
          {#each conversationInfo.groupUsers as user, i}
            <span>{user.username}{i === conversationInfo.groupUsers.length -1 ? '': ', '}</span>
          {/each}
        </p>
      </div>
    </div>

  {/if}
  
{/if}


<style>
  .conversationInfo {
    padding: 0;
    padding-left: 62px;
    width: 100%;
    height: 70px;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 10px;
    background-color: rgb(70, 70, 70);
    border-left: rgb(60, 60, 60) solid 1px;
  }

  .userInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .name {
    color: white;
    font-size: 20px;
    line-height: 1.2;
    margin: 0;
  }

  .lastseen {
    color: rgb(110 222 110);
    font-size: 20px;
    line-height: 1.2;
    margin: 0;
  }

  img {
    width: 45px;
    height: 45px;
    margin: 0;
    border-radius: 50px;
  }

  .groupUsers {
    margin: 0;
    color: rgb(200, 200, 200);
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
</style>