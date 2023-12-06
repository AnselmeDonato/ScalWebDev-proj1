import * as assignments from "../services/programmingAssignmentService.js";

const gradeSubmission = async (request, _mappingResult) => {
  const requestData = await request.json();
	
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

	console.log("Response"); 
	console.log(response); 

  return response;
};

export { gradeSubmission }; 