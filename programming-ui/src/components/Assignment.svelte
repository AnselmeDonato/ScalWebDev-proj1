<script>
	// import { subscribe } from "svelte/internal";
	import { assignment, changeAssignment } from "../stores/stores.js";

	// 
	// Fetch the assignment corresponding to the given id and updates the locally stored assignment accordingly
	// 
	export async function fetchAssignmentById(id) {
		const response = await fetch(`http://localhost:7800/api/assignment/${id}`); 
		const json = await response.json(); 
		$assignment = json; 
		// $assignment = JSON.stringify(json); 
	}; 

	// Fetch the first assignment if the stored assignment is empty
	// (we can check if stored assignment empty by e.g checking if it has a title property)
	if(!$assignment.hasOwnProperty("title")){
		fetchAssignmentById(1); 
		console.log("Here"); 
	}

	// React to change assignment 
	changeAssignment.subscribe((change) => {
		if(change){
			fetchAssignmentById($assignment.id + 1); 
			$changeAssignment = false; 
		}
	}); // logs '0'
</script>

<div class="p-4 mb-4 flex flex-col">
	<h2 class="text-base font-semibold leading-7 text-gray-900">Current assignment: {$assignment.title}</h2>
	
	<p class="rounded-md outline outline-1 outline-indigo-600 px-3 py-2 text-sm shadow-sm">
		{$assignment.handout}
	</p>

</div>

