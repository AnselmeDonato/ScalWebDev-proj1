import * as assignments from "../services/programmingAssignmentService.js";
import * as submissions from "../services/submissionsService.js";

const processSubmission = async (request, _mappingResult) => {
  const requestData = await request.json();
	const search_results = await submissions.searchWithAttributes(requestData.assignmentId, requestData.uuid, requestData.code);
	
	if(search_results.length != 0) {		
		return new Response(JSON.stringify(search_results[0]), { status: 200 })
	}
	else {		
		await submissions.create(requestData.assignmentId, requestData.uuid, requestData.code); 
		return gradeSubmission(requestData); 
	}
};

const gradeSubmission = async (requestData) => {
	const assignment = await assignments.findById(requestData.assignmentId);
	const data = {
		testCode: assignment.test_code,
		code: requestData.code,
	};

	const response = await fetch("http://grader-api:7000/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const responseJson = await response.json();
	const feedback = responseJson.result; 

	const correct = feedback.includes("OK") && !feedback.includes("FAIL"); 

	const result = await submissions.updateSubmissionGrading(feedback, correct); 		
	return new Response(JSON.stringify(result[0]), { status: 200 })
};

export { processSubmission }; 