<script>
  import { code, gradingResult, changeAssignment} from "../stores/stores.js";
	
	const nextAssignment = async () => {
		$changeAssignment = true; 
		$code = ""; 
		$gradingResult = ""; 
	}
</script>

<!-- Submission status -->
{#if $gradingResult != ""}
<div class="space-y-8 pt-8">
	<h2 class="text-base font-semibold leading-7 text-gray-900">Submission result:</h2>
	<p> {$gradingResult} </p>

	{#if !$gradingResult.includes("FAIL")}
		<button 
			type="submit" 
			class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			on:click={nextAssignment}
			>Next assignment</button>
	{/if}
</div>

{/if}

