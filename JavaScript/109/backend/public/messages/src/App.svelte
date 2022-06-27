<script>
	import Login from './Login.svelte';
	import Messages from './Messages.svelte';
	import Users from './Users.svelte';
	import { io } from "socket.io-client";
  const socket = io("ws://localhost");
	
	let user = { loggedIn: false};
</script>

<main>
		{#if !user.loggedIn}
			<div class="login">
				<Login socket={socket} bind:user></Login>
			</div>
		{:else}
			<div class="messages">
				<Users></Users>
				<Messages socket={socket} bind:user></Messages>
			</div>
		{/if}    
</main>

<style>
	.messages {
		width: 100%;
		height: 100%;
		margin: auto;
		display: grid;
		grid-template-columns: 180px 1fr;
	}

	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-color: #6b9e67;
	}

	main {
		width: 100%;
		height: 100%;
	}
</style>