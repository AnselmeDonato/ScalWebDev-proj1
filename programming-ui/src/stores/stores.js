import { readable, writable } from "svelte/store";

// Code (saved in LocalStorage)
let storedCode = localStorage.getItem("code"); 
const code = writable(storedCode || ""); 
code.subscribe((value) => {localStorage.setItem("code", value)}); 

// User id (saved in LocalStorage)
let user = localStorage.getItem("userUuid");
if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
  localStorage.setItem("code", "");
} 
const userUuid = readable(user);

// Assignment (saved in LocalStorage)
const assignment = writable({}); 

// "Flag" to go to next assignment
const changeAssignment = writable(false); 


// Submission 
const submission = writable(null); 

export {userUuid, code, assignment, changeAssignment, submission}