import * as assignmentsService from "../services/programmingAssignmentService.js";
import { responseDetails } from "../utils/requestUtils.js"; 

const getAssignmentById = async (_request, mappingResult) => {
	const id = mappingResult.pathname.groups.id;

  const assignment = await assignmentsService.findById(id);

  const response = new Response(JSON.stringify(assignment), responseDetails);

	return response; 
};

export { getAssignmentById }; 