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
	import { tasks } from '$lib/store';

    let user = null;
	let taskLists = [];
    let selectedListId = '';

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
    }

	async function fetchTaskLists() {
		const data = localStorage.getItem('sb-nhzplnhaelxwtxqyrhbg-auth-token');
		const token = JSON.parse(data).provider_token;
		await fetch("https://tasks.googleapis.com/tasks/v1/users/@me/lists/", {
		method: "GET",
		headers: {
			'Authorization':'Bearer ' + token	// Access token for google
		}}).then((data) => {
			return data.json();
		}).then((data) => {
			taskLists = data.items || [];
		});
	}

	async function fetchTasks(listId) {
		const data = localStorage.getItem('sb-nhzplnhaelxwtxqyrhbg-auth-token');
		const token = JSON.parse(data).provider_token;
		await fetch("https://tasks.googleapis.com/tasks/v1/lists/" + listId + "/tasks?showCompleted=false", {
		method: "GET",
		headers: {
			'Authorization':'Bearer ' + token	// Access token for google
		}}).then((data) => {
			return data.json();
		}).then((data) => {
			addTasks(data.items);
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
		taskLists = [];
        tasks.update([]);
    }

	function handleListSelection(event) {
        selectedListId = event.target.value;
        fetchTasks(selectedListId);
    }

	function addTasks(newTasks) {
		for (let task of newTasks) {
			const newTask = {
				id: Math.floor(Math.random() * 10000),
				name: task.title,
				category: 'Otro',
				estimatedTime: 2,
				timeUnit: 'horas',
				description: task.notes || null,
				startTime: null,
				endTime: null,
				isCompleted: false
			};
			tasks.update(tasks => [...tasks, newTask]);
		}
  	}

</script>

<nav>
    {#if user}
        <div class="user-section">
            <p>Welcome {user.email}</p>
            <button on:click={signOut} class="signout-btn">Sign out</button>
        </div>
        {#if taskLists.length > 0}
			<div class="task-lists">
				<label for="task-lists-select">Task lists:</label>
				<select id="task-lists-select" on:change={handleListSelection}>
					<option value="">Select a task list</option>
					{#each taskLists as list}
					<option value={list.id}>{list.title}</option>
					{/each}
				</select>
			</div>
		{:else}
			<button on:click={fetchTaskLists} class="fetch-tasks-btn">Sincronize My Task Lists</button>
        {/if}
    {:else}
        <button on:click={signInWithGoogle} class="signin-btn">Sign in with Google</button>
    {/if}
    <h1>Task Timer</h1>
    <div class="nav-links">
        <a href="/">Home</a>
        <a href="/create-task">Create Task</a>
    </div>
</nav>

<slot />


<style>
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
		justify-content: space-between;
        padding: 1rem;
        background-color: #6200ea;
        color: white;
        font-family: 'Roboto', sans-serif;
        border-bottom: 2px solid #3700b3;
    }
    h1 {
        margin: 0.5rem 0;
    }
    .nav-links {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }
    .nav-links a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border: 2px solid white;
        border-radius: 5px;
        transition: background-color 0.3s, color 0.3s;
    }
    .nav-links a:hover {
        background-color: white;
        color: #6200ea;
    }
    .user-section, .task-lists {
		display: flex;
		flex-direction: column;
        margin-bottom: 1rem;
    }
    .user-section p {
        margin: 0;
        padding: 0.5rem 0;
    }
    button {
        background-color: #d4eafc;
        color: #6200ea;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
    }
    button:hover {
        background-color: #018786;
        color: white;
    }
    .signout-btn, .fetch-tasks-btn {
        margin-left: 0.5rem;
    }
    .signin-btn {
        margin-top: 1rem;
    }
    select {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
</style>
