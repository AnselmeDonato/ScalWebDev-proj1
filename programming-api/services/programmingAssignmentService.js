import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM programming_assignments;`;
};

const findById = async (id) => {
  const results = await sql`SELECT * FROM programming_assignments WHERE id = ${ id };`;
	return results[0]; 
};

export { findAll, findById };
