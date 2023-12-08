import * as assignmentController from "./controllers/assignmentController.js"; 
import * as submissionsController from "./controllers/submissionController.js"; 
import { serve } from "./deps.js";

const urlMapping = [
	// Hello (for testing purpose)
	{
	  method: "GET",
	  pattern: new URLPattern({ pathname: "/" }),
	  fn: () => new Response("Hello World", { status: 200 }),
	},

	// Get assignment
	{
	  method: "GET",
	  pattern: new URLPattern({ pathname: "/assignment/:id" }),
	  fn: assignmentController.getAssignmentById,
	},

	// Grade
	{
	  method: "POST",
	  pattern: new URLPattern({ pathname: "/submit" }),
	  fn: submissionsController.processSubmission,
	},
];

const handleRequest = async (request) => {
	const mapping = urlMapping.find(
	  (um) => um.method === request.method && um.pattern.test(request.url)
	);
  
	if (!mapping) {
	  return new Response("Not found", { status: 404 });
	}
  
	const mappingResult = mapping.pattern.exec(request.url);
	try {
    return await mapping.fn(request, mappingResult);
	} catch (e) {
	  console.log(e);
	  return new Response(e.stack, { status: 500 }); 
	}
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
