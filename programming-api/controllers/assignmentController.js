import * as assignmentsService from "../services/programmingAssignmentService.js";
import { responseDetails } from "../utils/requestUtils.js"; 

const getHandout = async (_request, _mappingResult) => {
  const assignments = await assignmentsService.findAll();
	const assignment = assignments[0]; 

  const response = new Response(JSON.stringify(assignment), responseDetails);

	return response; 
};

export { getHandout }; 