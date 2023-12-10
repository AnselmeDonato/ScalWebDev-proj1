import { sql } from "../database/database.js";

const searchWithAttributes = async (assignment_id, code) => {
	return await sql`SELECT * FROM programming_assignment_submissions WHERE programming_assignment_id = ${assignment_id} AND code = ${code} AND status = 'processed';`;
}

const getById = async (id) => {
	const results = await sql`SELECT * FROM programming_assignment_submissions WHERE id = ${id};`;
	return results[0]; 
}

const create = async (assignment_id, uuid, code) => {
	const results =  await sql`INSERT INTO programming_assignment_submissions (programming_assignment_id, code, user_uuid) VALUES (${ assignment_id }, ${ code }, ${ uuid }) RETURNING *;`;
	return results[0]; 
}

const createWithAttributes = async (assignment_id, code, uuid, grader_feedback, correct) => {
	const results =  await sql`INSERT INTO programming_assignment_submissions (programming_assignment_id, code, user_uuid, status, grader_feedback, correct) VALUES (${ assignment_id }, ${ code }, ${ uuid }, 'processed', ${ grader_feedback }, ${ correct }) RETURNING *;`;
	return results[0]; 
}

const updateSubmissionGrading = async (id, feedback, correct) => {
	return await sql`UPDATE programming_assignment_submissions SET grader_feedback = ${feedback}, correct = ${correct}, status = 'processed', last_updated = NOW() WHERE id = ${ id };`; 
}

export { searchWithAttributes, create, updateSubmissionGrading, getById, createWithAttributes };
