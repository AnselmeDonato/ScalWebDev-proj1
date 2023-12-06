<script>
	import { assignment } from "../stores/stores.js";

	const fetchHandout = async () => {
		const response = await fetch("http://localhost:7800/api/handout"); 
		$assignment = await response.json(); 
	}; 

	// Check that the assignment is not empty (e.g by checking it has a title)
	if(!$assignment.hasOwnProperty("title")){
		fetchHandout(); 
	}

</script>

<div class="p-4 mb-4 flex flex-col">
	<h2 class="text-base font-semibold leading-7 text-gray-900">Your mission, should you choose to accept it: {$assignment.title}</h2>
	
	<p class="rounded-md outline outline-1 outline-indigo-600 px-3 py-2 text-sm shadow-sm">
		{$assignment.handout}
	</p>

</div>
