<script>
	import Login from './Login.svelte';
	import Messages from './Messages.svelte';
	import Conversations from './Conversations.svelte';
	import { io } from "socket.io-client";
	import ConversationNav from './ConversationNav.svelte';
	import { getCookie } from './utils';
	import { selectedConversation, userConversations, userInfo, chatUsers, resetStore } from './stores';
	import AppInfo from './AppInfo.svelte';

  let users = [];
	let conversations = [];
	let messagesScroll;
	let currentConversation;

	userConversations.subscribe(v => {
		conversations = v;
		console.log(v);
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
			userInfo.set(u);
		})

		socket.on('logout', () => {
			logout();
			window.location.reload();
		})

		socket.on('conversations', c => {
			//
			if(c[0].self) {
				selectedConversation.set(c[0]);
			}
			userConversations.set(c);
		})

		socket.on('typing', conv => {
			let typingConv;
			switch(conv.type) {
				case 'pm':
					typingConv = conversations.find(c => {
						return c.conversationId === conv.conversationId;
					});
					if(!typingConv) {
						return;
					}
					typingConv.lastTypingEmit = new Date();
					break;
				case 'group':
					typingConv = conversations.find(c => {
						return c.groupId === conv.groupId;
					});
					if(!typingConv) {
						return;
					}
					typingConv.groupUsers.forEach(u => {
						if(u.userid === conv.userId) {
							u.lastTypingEmit = new Date();
						}
					});
					break;
			}
			userConversations.set(conversations);
			setTimeout(() => {
				userConversations.set(conversations);
			}, 5000);
		})

		socket.on('newConversation', c => {
			//When
			if(c.self) {
				selectedConversation.set(c);
			}
			console.log('newConversation', c);
			conversations.unshift(c);
			console.log(conversations);
			userConversations.set(conversations);
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
				theConversation.lastTypingEmit = undefined;
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
		resetStore();
	}
	
</script>

{#if !user}
	<main class="login">
		<Login login={login}></Login>
	</main>
{:else}
	<aside>
		<ConversationNav {socket} logout={logout}></ConversationNav>
		<Conversations></Conversations>
	</aside>
	<main>
		{#if currentConversation}
			<Messages bind:scroll={messagesScroll} socket={socket}></Messages>
		{:else}
			<AppInfo></AppInfo>
		{/if}
	</main>
{/if}

<style>
	aside, main {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	aside {
		display: flex;
		flex-direction: column;
	}

	.login {
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
	}

</style>