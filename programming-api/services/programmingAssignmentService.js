import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM programming_assignments;`;
};

const findById = async (id) => {
  const results = await sql`SELECT * FROM programming_assignments WHERE id = ${ id };`;
	if(results.length == 0){
		console.log("Not found"); 
		return {
			id: id,
			title: "Rest", 
			handout: "Looks like you have done all the assignments for now: you can take a well deserved break. See you later."
		}; 
	}
	return results[0]; 
};

export { findAll, findById };
