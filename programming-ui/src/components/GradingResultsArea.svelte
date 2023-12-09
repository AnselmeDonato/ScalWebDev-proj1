<script>
  import { code, changeAssignment, submission} from "../stores/stores.js";
	
	const triggerNextAssignment = async () => {
		// Updating changeAssignment will trigger the fetch for the next assignment 
		$changeAssignment = true; 
		
		// Cleaning previous result (both for convenience and visual cue for the user that they are changing assignment)
		$submission = null; 
		$code = ""; 
	}

	const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

	const fetchSubmission = async () => {
		const response = await fetch(`/api/submission/${$submission.id}`, {method: "GET"});
		$submission = await response.json(); 

		if($submission.status != "processed"){
			await sleep(1000); 
			fetchSubmission()
		}
	}
</script>

<!-- Submission status -->
{#if $submission != null}
	{#if $submission.status === "processed"}
		<div class="space-y-8 pt-8">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Submission result:</h2>
			<p> {$submission.grader_feedback} </p>

			<!-- Only show "Next Assignment" button if correct submission -->
			{#if $submission.correct}
				<button 
					type="submit" 
					class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					on:click={triggerNextAssignment}
					>Next assignment</button>
			{/if}
		</div>
	{:else}
	{fetchSubmission()}
		<div class="space-y-8 pt-8">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Waiting for grading</h2>
		</div>

	{/if}
{/if}

