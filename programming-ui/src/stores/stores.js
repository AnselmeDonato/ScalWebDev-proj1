import { readable, writable } from "svelte/store";

// User id (saved in LocalStorage)
let user = localStorage.getItem("userUuid");
if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
} 
const userUuid = readable(user);

// Assignment (saved in LocalStorage)
let storedAssignment = localStorage.getItem("assignment"); 
const assignment = writable(JSON.parse(storedAssignment) || {}); 
assignment.subscribe((json) => {localStorage.setItem("assignment", JSON.stringify(json))}); 

// "Flag" to go to next assignment
const changeAssignment = writable(false); 

// Code (saved in LocalStorage)
let storedCode = localStorage.getItem("code"); 
const code = writable(storedCode || ""); 
code.subscribe((value) => {localStorage.setItem("code", value)}); 

// Submission 
const submission = writable(null); 

export {userUuid, code, assignment, changeAssignment, submission}