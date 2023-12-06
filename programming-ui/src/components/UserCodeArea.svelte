<script>
  import { userUuid, code, assignmentId } from "../stores/stores.js";

	let result = null; 
	let waitingForResult = false; 

	const submitCode = async () => {
		waitingForResult = true; 
		$code = document.getElementById("codeTextArea").value; 

		const data = {
			user: $userUuid, 
			code: $code, 
			assignmentId: $assignmentId
		}

		const response = await fetch("/api/grade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
		result = jsonData.result; 
		waitingForResult = false; 
    // alert(JSON.stringify(jsonData));
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

<!-- Submit button  -->
<div class="mt-6 flex items-center justify-end gap-x-6">
	{#if ! waitingForResult}
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

<!-- Submission status -->
{#if result}
	<h2 class="text-base font-semibold leading-7 text-gray-900">Submission result:</h2>
	<p> {result} </p>
{/if}
