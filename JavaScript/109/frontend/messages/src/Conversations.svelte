<script>
  import { userConversations } from './stores';
  import Conversation from './Conversation.svelte';

  let conversations = [];

  userConversations.subscribe(v => {
    conversations = v;
    ('v', v);
  });

</script>


<div class=users>
  {#each conversations || [] as c}
    <div class="user">
      <Conversation conversation={c}></Conversation>
      <div class="hr"></div>
    </div>
  {/each}
</div>


<style>
  .hr {
    border-top: 1px solid rgb(40, 40, 40);
  }

  .users {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    background-color: rgb(75, 75, 75);
  }
  
  .users::-webkit-scrollbar {
    cursor: pointer;
    width: 0px;
  }
  
  .users::-webkit-scrollbar-track {
        cursor: pointer;

    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
  }
  
  .users::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

</style>