import * as assignments from "../services/programmingAssignmentService.js";
import * as submissions from "../services/submissionsService.js";

const submissionGradingQueue = []; 

const getSubmissionById = async (_request, mappingResult) => {
	const id = mappingResult.pathname.groups.id;
	const search_result = await submissions.getById(id);
	return new Response(JSON.stringify(search_result), { status: 200 })
};

const processSubmission = async (request, _mappingResult) => {
  const requestData = await request.json();

	// Check if a similar submission (same code, user and assignment) already exists in db
	const search_results = await submissions.searchWithAttributes(requestData.assignmentId, requestData.uuid, requestData.code);
	
	if(search_results.length != 0) {		
		// Return the already existing submission 
		return new Response(JSON.stringify(search_results[0]), { status: 200 })
	}
	else {
		// Create a new submission 
		const submission = await submissions.create(requestData.assignmentId, requestData.uuid, requestData.code); 

		// Find the data needed to grade the new submission and add it to the const submissionGradingQueue
		const assignment = await assignments.findById(submission.programming_assignment_id);
		const data = {
			submissionId: submission.id, 
			testCode: assignment.test_code,
			code: requestData.code,
		};
		submissionGradingQueue.unshift(data); 
		processGradingQueue(); 

		// Return the submission info
		return new Response(JSON.stringify(submission), { status: 200 })
	}
};

const processGradingQueue = async () => {
	while(submissionGradingQueue.length != 0){
		const data = submissionGradingQueue.pop(); 
	
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
	}
};

export { processSubmission, getSubmissionById }; 