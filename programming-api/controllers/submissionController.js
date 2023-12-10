import * as assignments from "../services/AssignmentService.js";
import * as submissions from "../services/submissionsService.js";

// Queue of submission waiting to be graded
const gradingQueue = await Deno.openKv();
gradingQueue.listenQueue(async (data) => {
	// HTTP request to the grading server
	const response = await fetch("http://grader-api:7000/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	// Processing grading result and updating submission in db accordingly 
	const responseJson = await response.json();
	const feedback = responseJson.result; 
	const correct = feedback.includes("OK") && !feedback.includes("FAIL"); 
	await submissions.updateSubmissionGrading(data.submissionId, feedback, correct); 
}); 


/**
 * Find a submission with its id
*/
const findById = async (_request, mappingResult) => {
	const id = mappingResult.pathname.groups.id;
	const search_result = await submissions.getById(id);
	return new Response(JSON.stringify(search_result), { status: 200 })
};

/**
 * Process a new submission: 
 * - if it corresponds to an old one, fetch that old one and return it
 * - if it's new, create a new submission in db and submit it for grading
*/
const processSubmission = async (request, _mappingResult) => {
	const requestData = await request.json();
	
	// Check if a similar submission (same code and assignment) already exists in db
	const search_results = await submissions.searchWithAttributes(requestData.assignmentId, requestData.code);
	
	if(search_results.length != 0) {	
		// Copy the info of the existing submission into the new one
		const new_submission = await submissions.createWithAttributes(requestData.assignmentId, requestData.code, requestData.uuid, search_results[0].grader_feedback, search_results[0].correct); 
		console.log(new_submission); 
		return new Response(JSON.stringify(new_submission), { status: 200 })
	}
	else {
		// Create a new submission 
		const submission = await submissions.create(requestData.assignmentId, requestData.uuid, requestData.code); 
		
		// Find the data needed to grade this new submission and add it to the grading queue
		const assignment = await assignments.findById(submission.programming_assignment_id);
		const data = {
			submissionId: submission.id, 
			testCode: assignment.test_code,
			code: requestData.code,
		};
		await gradingQueue.enqueue(data); 
		
		// Return the submission info
		return new Response(JSON.stringify(submission), { status: 200 })
	}
};


export { processSubmission, findById }; 