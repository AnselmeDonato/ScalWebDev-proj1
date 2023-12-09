<script>
  import { userUuid, code, assignment, submission} from "../stores/stores.js";

	// Used to deactivate the "submit" button while waiting for a response from the grading system 
	let pendingSubmission = false; 

	// 
	// Submit the written code to the grading system and updates the gradingResult store accordingly
	// 
	const submitCode = async () => {
		const codeTextArea = document.getElementById("codeTextArea").value;

		// Early return if textArea empty 
		if(codeTextArea === ""){
			return 0; 
		} 

		// Prepare data for the request 
		$code = codeTextArea; 
		pendingSubmission = true; 
		const submissionData = {
			uuid: $userUuid, 
			code: $code, 
			assignmentId: $assignment.id
		}
		
		// Request to submit the code 
		const submissionResponse = await fetch("/api/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(submissionData),
		});

		// Get the submission results and update store
		$submission = await submissionResponse.json();

		// Process is done: submission is no longer pending
		pendingSubmission = false; 
	}; 
</script>

<!-- Text Area for the code  -->
<div class="col-span-full">
	<label for="codeTextArea" class="block text-sm font-medium leading-6 text-gray-900">Code</label>
	<div class="mt-2">
		<textarea id="codeTextArea" rows="3" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{$code}</textarea>
	</div>
	<p class="mt-3 text-sm leading-6 text-gray-600">Write Python code to solve the problem in the handout.</p>
</div>

<!-- Submit button, only activated if there is no pending submission  -->
<div class="mt-6 flex items-center gap-x-6">
	{#if ! pendingSubmission}
		<button 
			type="submit" 
			class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			on:click={submitCode}
			>Submit</button>
	{:else}
		<button 
			type="submit" 
			class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>Grading</button>
	{/if}
</div>