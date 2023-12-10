import http from "k6/http";

export const options = {
  duration: "5s",
  vus: 10,
	summaryTrendStats: ["avg", "p(99)"]
};



export default function () {
  http.post(
		"http://localhost:7800/api/submit", 
		JSON.stringify({
			uuid: Math.floor(Math.random() * 1000000000).toString(), 
			code: 'def hello(): return "Hello"', 
			assignmentId: 1
		})
	);
}