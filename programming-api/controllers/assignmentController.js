import * as assignmentsService from "../services/programmingAssignmentService.js";
import { responseDetails } from "../utils/requestUtils.js"; 

const findById = async (_request, mappingResult) => {
	const assignmentId = mappingResult.pathname.groups.id;
  const assignment = await assignmentsService.findById(assignmentId);
  const response = new Response(JSON.stringify(assignment), responseDetails);

	return response; 
};

const findForUuid = async (_request, mappingResult) => {
	const uuid = mappingResult.pathname.groups.uuid;
  const assignment = await assignmentsService.findForUuid(uuid);
  const response = new Response(JSON.stringify(assignment), responseDetails);

	return response; 
}

export { findById, findForUuid }; 