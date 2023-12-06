import { readable, writable } from "svelte/store";

// ----------------------- User Id ----------------------- //
let user = localStorage.getItem("userUuid");

if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
} 

const userUuid = readable(user);




// ----------------------- Assignment ----------------------- //
let storedAssignment = localStorage.getItem("assignment"); 

const assignment = writable(JSON.parse(storedAssignment) || {}); 

// Update the local storage when the stored value changes
// The assignment is a JSON, stored locally as a string 
assignment.subscribe((json) => {localStorage.setItem("assignment", JSON.stringify(json))}); 

const changeAssignment = writable(false); 


// ----------------------- Code written by the user ----------------------- //
// To avoid the frustration of seeing your code erased when refreshing the page,
// (which happened to me many times) the code is also stored locally
let storedCode = localStorage.getItem("code"); 

const code = writable(storedCode || ""); 

// Update the local storage when the stored value changes
code.subscribe((value) => {localStorage.setItem("code", value)}); 




// ----------------------- Grading Result ----------------------- //
// Note: the grading result is not stored in the localStorage 
// (in my opinionm, in this context this is not a feature the user would want)

const gradingResult = writable(""); 

export {userUuid, code, assignment, gradingResult, changeAssignment}