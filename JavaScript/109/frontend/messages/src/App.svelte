<script>
	import Login from './Login.svelte';
	import Messages from './Messages.svelte';
	import Conversations from './Conversations.svelte';
	import { io } from "socket.io-client";
	import ConversationNav from './ConversationNav.svelte';
	import { getCookie } from './utils';
	import { selectedConversation, userConversations, userInfo, chatUsers } from './stores';

  let users = [];
	let conversations = [];
	let messagesScroll;
	let currentConversation;

	userConversations.subscribe(v => {
		conversations = v;
	})

	chatUsers.subscribe(v => {
		users = v;
	});

	let user;
	let socket;

	userInfo.subscribe(v => {
		user = v;
	})

	selectedConversation.subscribe(v => {
		currentConversation = v;
	})

	const login = () => {
		socket = io("ws://localhost", {
			withCredentials: true,
		});

		socket.on('lastseen', u => {
			const user = users.find(us => us.id === u.userid);
			if(user){
				user.lastseen = u.datetime;
			}
			chatUsers.set(users);
		})

		socket.on('login', u => {
			userInfo.set(u)
		})

		socket.on('logout', () => {
			logout();
			window.location.reload();
		})

		socket.on("message", messageToAdd => {
			let theConversation;

			if(messageToAdd.groupId) {
				theConversation = conversations.find(c => {
					return c.groupId === messageToAdd.groupId;
				});
			} else {
				theConversation = conversations.find(c => {
					return c.conversationId === messageToAdd.conversationId
				});
			}

			const index = conversations.indexOf(theConversation);

			conversations = conversations.filter(v => v !== theConversation);
			conversations.unshift(theConversation);

			theConversation.messages.unshift(messageToAdd);

			if(currentConversation === theConversation){
				selectedConversation.set(currentConversation);
			}

			userConversations.set(conversations);
		});

		socket.on("addUsers", usersToAdd => {
			users = users.concat(usersToAdd);
			chatUsers.set(users);
		});

		socket.on('conversetions', c => {
			userConversations.set(c);
			selectedConversation.set(c[0]);
		})
	}

  const usernameCookie = getCookie('username');

  if(usernameCookie) {
		userInfo.set(true);
    login();
  }

	const logout = () => {
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		socket?.emit('logout', 'logout');
		socket = undefined;
  	users = [];
		userInfo.set(false);
	}
	
</script>

{#if !user}
	<main class="login">
		<Login login={login}></Login>
	</main>
{:else}
	<aside>
		<ConversationNav logout={logout}></ConversationNav>
		<Conversations></Conversations>
	</aside>
	<main>
		<Messages bind:scroll={messagesScroll} socket={socket}></Messages>
	</main>
{/if}

<style>
	aside, main {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.login {
		height: 400px;
		width: 500px;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -200px; /* Negative half of height. */
		margin-left: -250px; /* Negative half of width. */
	}

</style>