import { sql } from "../database/database.js";

const searchWithAttributes = async (assignment_id, uuid, code) => {
	return await sql`SELECT * FROM programming_assignment_submissions WHERE user_uuid = ${uuid} AND programming_assignment_id = ${assignment_id} AND code = ${code};`;
}

const create = async (assignment_id, uuid, code) => {
	return await sql`INSERT INTO programming_assignment_submissions (programming_assignment_id, code, user_uuid) VALUES (${ assignment_id }, ${ code }, ${ uuid });`;
}

const updateSubmissionGrading = async (feedback, correct) => {
	return await sql`UPDATE programming_assignment_submissions SET grader_feedback = ${feedback}, correct = ${correct}, status = 'processed', last_updated = NOW() RETURNING *;`; 
}

export { searchWithAttributes, create, updateSubmissionGrading };
