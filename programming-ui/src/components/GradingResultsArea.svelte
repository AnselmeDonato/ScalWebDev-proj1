<script>
  import { gradingResult } from "../stores/stores.js";
</script>

<!-- Submission status -->
{#if $gradingResult != ""}
	<h2 class="text-base font-semibold leading-7 text-gray-900">Submission result:</h2>
	<p> {$gradingResult} </p>
{/if}
