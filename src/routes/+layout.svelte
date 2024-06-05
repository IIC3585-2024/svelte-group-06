<script context="module" lang="ts">
    import { supabaseClient } from '$lib/supabaseClient';

    export async function load({ session }) {
        return {
            session,
        };
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte';

    let user = null;
	let taskLists = [];
    let selectedListId = '';
    let tasks = [];

    onMount(async () => {
        const { data, error } = await supabaseClient.auth.getUser();
        user = data.user;
    });

    async function signInWithGoogle() {
        const { user, session, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
			options: {
                scopes: ['https://www.googleapis.com/auth/tasks']
            }
        });
		if (error) {
        console.log('Error logging in:', error.message);
		} else {
			document.cookie = `sb-access-token=${session.access_token}; path=/`;
		}
    }

	async function fetchTaskLists() {
		console.log("Fetching Task Lists");
		const data = localStorage.getItem('sb-nhzplnhaelxwtxqyrhbg-auth-token');
		console.log(data);
		const token = JSON.parse(data).provider_token;
		console.log(token);
		await fetch("https://tasks.googleapis.com/tasks/v1/users/@me/lists/", {
		method: "GET",
		headers: {
			'Authorization':'Bearer ' + token	// Access token for google
		}}).then((data) => {
			return data.json();
		}).then((data) => {
			console.log(data);
			alert("Here are your google task lists!");
			taskLists = data.items || [];
		});
	}

	async function fetchTasks(listId) {
		console.log("Fetching Tasks");
		const data = localStorage.getItem('sb-nhzplnhaelxwtxqyrhbg-auth-token');
		const token = JSON.parse(data).provider_token;
		console.log(token);
		await fetch("https://tasks.googleapis.com/tasks/v1/lists/" + listId + "/tasks?showCompleted=false", {
		method: "GET",
		headers: {
			'Authorization':'Bearer ' + token	// Access token for google
		}}).then((data) => {
			return data.json();
		}).then((data) => {
			console.log(data);
			alert("Here are your google tasks!");
			tasks = data.items || [];
		});
	}

    async function signOut() {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.log('Error logging out:', error.message);
        } else {
            document.cookie = 'sb-access-token=; Max-Age=0; path=/';
        }
        user = null;
        tasks = [];
    }

	function handleListSelection(event) {
        selectedListId = event.target.value;
        fetchTasks(selectedListId);
    }

</script>

<nav>
	{#if user}
		<button on:click={signOut}>Sign out</button>
		<p>Welcome, {user.email}</p>
		<button on:click={fetchTaskLists}>Fetch Google Tasks</button>
		<select on:change={handleListSelection}>
			<option value="">Select a task list</option>
			{#each taskLists as list}
				<option value={list.id}>{list.title}</option>
			{/each}
		</select>
		<ul>
			{#if tasks.length > 0}
				{#each tasks as task}
					<li>{task.title}</li>
				{/each}
			{:else}
				<li>No incomplete tasks found</li>
			{/if}
		</ul>
	{:else}
		<button on:click={signInWithGoogle}>Sign in with Google</button>
	{/if}
</nav>

<slot />