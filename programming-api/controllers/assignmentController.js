import * as assignmentsService from "../services/AssignmentService.js";
import { responseDetails } from "../utils/requestUtils.js"; 

/**
 * Find an assignment with its id
 */
const findById = async (_request, mappingResult) => {
	const assignmentId = mappingResult.pathname.groups.id;
  const assignment = await assignmentsService.findById(assignmentId);
  const response = new Response(JSON.stringify(assignment), responseDetails);

	return response; 
};

/**
 * Find the next assignment not completed yet by the user 
 */
const findForUuid = async (_request, mappingResult) => {
	const uuid = mappingResult.pathname.groups.uuid;
  const assignment = await assignmentsService.findForUuid(uuid);
  const response = new Response(JSON.stringify(assignment), responseDetails);

	return response; 
}

export { findById, findForUuid }; 