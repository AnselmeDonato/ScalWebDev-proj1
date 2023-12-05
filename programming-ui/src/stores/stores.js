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

export {userUuid, code}