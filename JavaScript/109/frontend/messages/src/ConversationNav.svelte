<script>
  export let logout;
  import { getCookie } from './utils';
  import { chatUsers, userConversations, newConversationS } from './stores';

  let newMessageOpen = false;
  let newGroupOpen = false;
  let users = [];
  let conversations = [];

  chatUsers.subscribe(v => users = v);
  userConversations.subscribe(v => conversations = v);

  const toggleNewMessage = () => {
    newMessageOpen = !newMessageOpen;
  }

  const togglenewGroup = () => {
    newGroupOpen = !newGroupOpen;
  }

  const startChat = (userId, userName) => {
    newMessageOpen = false;
    (`Starting chat with user ${userId}`);
    const oldConversation = conversations.find(c => {
      return c.otherUserId === userId;
    })

    if(oldConversation) {
      ('found', oldConversation);
      selectedConversation.set(oldConversation);
    } else {
      const newConversation = {
        type: 'pm', 
        otherUserId: userId,
        otherUserName: userName      
      }
      userConversations.set(conversations)
      newConversationS.set(oldConversation);
    }
  }
  
  import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown,
    Icon,
    Offcanvas
  } from 'sveltestrap';

import User from './User.svelte';
import Conversation from './Conversation.svelte';
  let isOpen = false;

  const username = getCookie('username');
  let settingsSelected = false;

  const onClick = async () => {
    logout();
  }

  window.addEventListener("click", function(){
    if(settingsSelected) {
      settingsSelected = false;
    }
  });

</script>

<div>
  <div class="navigation">
    <img src="./images/no-user.jpg" alt="">
    <Dropdown color="dark" dark {isOpen} toggle={() => (isOpen = !isOpen)}>
      <DropdownToggle tag="div" class="d-inline-block">
        <div class="three-dots">
          <Icon name="three-dots-vertical"></Icon>
        </div>
      </DropdownToggle>
      <DropdownMenu dark>

        <DropdownItem on:click={toggleNewMessage}>
          New Message
        </DropdownItem>

        <DropdownItem on:click={togglenewGroup}>
          New Group
        </DropdownItem>

        <DropdownItem on:click={logout}>
          Log Out
        </DropdownItem>

      </DropdownMenu>
    </Dropdown>

    <Offcanvas class="bg-secondary p-0" isOpen={newMessageOpen} toggle={toggleNewMessage} header={'Select a User'} placement="start">
      {#each users as u}
        <User click={() => startChat(u.id, u.username)} user={u}></User>
      {/each}
    </Offcanvas>

    <Offcanvas class="bg-secondary" isOpen={newGroupOpen} toggle={togglenewGroup} placement="start">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Offcanvas>
  </div>
</div>


<style>
.navigation {
  height: 70px;
  padding: 10px;
  background-color: rgb(70, 70, 70);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 20px;
}

:global(.offcanvas-body) {
    flex-grow: 1;
    padding: 5px !important;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 5px;

}

:global(.offcanvas-body::-webkit-scrollbar) {
  width: .3em;
}
  
:global(.offcanvas-body::-webkit-scrollbar-track) {
  cursor: pointer;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
  
:global(.offcanvas-body::-webkit-scrollbar-thumb) {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

.three-dots {
  color: white;
  border-radius: 50%;
  cursor: pointer;
  padding: 10px;
  font-size: 24px;
}

img {
  width: 45px;
  height: 45px;
  margin: 0;
  border-radius: 50px;
  float: left;
}

</style>