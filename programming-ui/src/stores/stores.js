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

const assignment = writable(storedAssignment || {}); 

// Update the local storage when the stored value changes
assignment.subscribe((value) => {localStorage.setItem("assignment", value)}); 




// ----------------------- Code written by the user ----------------------- //
// To avoid the frustration of seeing your code erased when refreshing the page,
// (which happened to me many times) the code is also stored locally
let storedCode = localStorage.getItem("code"); 

const code = writable(storedCode || ""); 

// Update the local storage when the stored value changes
code.subscribe((value) => {localStorage.setItem("code", value)}); 


export {userUuid, code, assignment}