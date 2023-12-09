import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM programming_assignments;`;
};

const findById = async (id) => {
  const results = await sql`SELECT * FROM programming_assignments WHERE id = ${ id };`;

	// We consider that "id doesn't exist" is always "the user has completed all tasks", and inform the user with a custom "assignment"
	if(results.length == 0){
		return {
			id: id,
			title: "Rest", 
			handout: "Looks like you have done all the assignments for now: you can take a well deserved break. See you later alligator."
		}; 
	}

	return results[0]; 
};

const findForUuid = async (uuid) => {
	var lastCorrectAssignmentId = 0; 

	// Fetch the assignmentId of the last correct submission 
  const correctSubmissionsSorted = await sql`SELECT * FROM programming_assignment_submissions WHERE user_uuid = ${ uuid } AND correct = TRUE ORDER BY last_updated DESC NULLS LAST;`;
	if(correctSubmissionsSorted.length != 0) {
		lastCorrectAssignmentId = correctSubmissionsSorted[0].programming_assignment_id; 
	}

	return await findById(lastCorrectAssignmentId + 1); 
};

export { findAll, findById, findForUuid };
