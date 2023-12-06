import { readable, writable } from "svelte/store";

// User Id
let user = localStorage.getItem("userUuid");

if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
} 

const userUuid = readable(user);

// User code
// Get the value of the storage code 
let localCode = localStorage.getItem("code"); 

// Set the stored velue (default: "")
const code = writable(localCode || ""); 

// Update the local storage when the stored value changes
code.subscribe((value) => {localStorage.setItem("code", value)}); 

// Assignment id
// Get the value of the storage id 
let localAssignmentId = localStorage.getItem("assignmentId"); 

// Set the stored velue (default: "")
const assignmentId = writable(localAssignmentId || ""); 

// Update the local storage when the stored value changes
assignmentId.subscribe((value) => {localStorage.setItem("assignmentId", value)}); 

export {userUuid, code, assignmentId}