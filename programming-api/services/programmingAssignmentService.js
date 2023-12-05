import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM programming_assignments;`;
};

const findById = async (id) => {
  return await sql`SELECT * FROM programming_assignments WHERE id = ${ id };`;
};

export { findAll, findById };
