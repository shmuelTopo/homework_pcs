<script>
  export let logout;
  export let socket;
  import { getCookie } from './utils';
  import { chatUsers, userConversations, selectedConversation, userInfo } from './stores';
  import ThreeDotsVertical from "svelte-bootstrap-icons/lib/threeDotsVertical.svelte"
  import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown,
    Offcanvas,
    Button,
    Input
  } from 'sveltestrap';

  import User from './User.svelte';

  let newMessageOpen = false;
  let newGroupOpen = false;
  let users = [];
  let conversations = [];
  let newGroupUsers = [];
  let groupName = '';
  let user;

  userInfo.subscribe(v => user = v);

  const newGroup = () => {
    if(newGroupUsers.length < 1) {
      alert('you most choose at least 1 user');
    } else {
      const newGroupInfo = {
        name: groupName,
        users: newGroupUsers
      }
      console.log(newGroupInfo);
      socket.emit('newGroup', newGroupInfo);
      groupName = '';

      togglenewGroup();
    }
  }

  chatUsers.subscribe(v => {
    users = v;
  });

  userConversations.subscribe(v => conversations = v);

  const toggleNewMessage = () => {
    newMessageOpen = !newMessageOpen;
  }

  const togglenewGroup = () => {
    if(newGroupOpen) {
      newGroupUsers.length = 0;
      users.forEach(u => {
        u.selected = false;
      })
      users = users;
    }
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
        newConversation: true, 
        otherUserId: userId,
        otherUserName: userName      
      }
      selectedConversation.set(newConversation);
    }
  }

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
          <ThreeDotsVertical></ThreeDotsVertical>
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
      <form on:submit|preventDefault={newGroup}>
        <div class="newGroupInputBtn">
          <input required minlength="4" type="text" bind:value={groupName} />
          <Button color="primary" type="submit">Create Group</Button>
        </div>
        {#each users as u}
          {#if u.id !== user.id}
            <label value="">
              <input class="hiddenCheckbox" bind:group={newGroupUsers} value={u.id} hidden type="checkbox">
              <User class="user" bind:user={u}></User>
            </label>
          {/if}
        {/each}
      </form>
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

form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.newGroupInputBtn {
  display: grid;
  grid-template-columns:  1fr 140px;
  gap: 10px;
  padding: 5px;
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