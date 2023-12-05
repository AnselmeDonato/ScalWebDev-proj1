<script>
	let id = -1; 
	let handout = ""; 
	let title = ""; 

	const getHandout = async () => {
		const response = await fetch("http://localhost:7800/api/handout"); 
		const json = await response.json(); 
		id = json["id"]; 
		handout = json["handout"]; 
		title = json["title"]; 
	}; 
</script>

<div class="p-4 mb-4 flex flex-col">
	<h2 class="text-base font-semibold leading-7 text-gray-900">Your mission, should you choose to accept it: {title}</h2>
	
	{#if handout != ""}
	<p class="rounded-md outline outline-1 outline-indigo-600 px-3 py-2 text-sm shadow-sm">
		{handout}
	</p>
	{/if}
	
	<div class="mt-6 flex items-center justify gap-x-6">
		<button 
			type="getHandout" 
			class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			on:click={getHandout}
			>Get Handout</button>
	</div>

</div>
