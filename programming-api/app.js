import * as assignmentController from "./controllers/assignmentController.js"; 
import * as submissionsController from "./controllers/submissionController.js"; 
import { serve } from "./deps.js";

const urlMapping = [
	// Hello World (for testing purpose)
	{
	  method: "GET",
	  pattern: new URLPattern({ pathname: "/" }),
	  fn: () => new Response("Hello World", { status: 200 }),
	},
	
	// Get assignment for a user
	{
		method: "GET",
	  pattern: new URLPattern({ pathname: "/user/:uuid" }),
	  fn: assignmentController.findForUuid,
	},
	
	// Handle new submission
	{
		method: "POST",
	  pattern: new URLPattern({ pathname: "/submit" }),
	  fn: submissionsController.processSubmission,
	},
	
	// Get submission by id (when client checks for updates on the submission)
	{
		method: "GET",
		pattern: new URLPattern({ pathname: "/submission/:id" }),
		fn: submissionsController.findById,
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
