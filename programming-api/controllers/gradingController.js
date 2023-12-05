import * as assignments from "../services/programmingAssignmentService.js";

const gradeSubmission = async (request, _mappingResult) => {
  const requestData = await request.json();
	
  const assignment = await assignments.find(requestData.assignmentId)[0];

  const testCode = assignment["test_code"];
  const data = {
    testCode: testCode,
    code: requestData.code,
  };

  const response = await fetch("http://grader-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export { gradeSubmission }; 