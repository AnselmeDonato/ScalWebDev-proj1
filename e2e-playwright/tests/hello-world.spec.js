const { test, expect } = require("@playwright/test");

test("Server responds with a page with the title 'Programming assignments'", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe("Programming assignments");
});

test('Bad submission fails the test', async ({ page }) => {
	await page.goto('http://localhost:7800/');
	await page.getByTestId('writeCode').click();
	await page.getByTestId('writeCode').fill("not even python code");
	await page.getByTestId("submitCode").click(); 
	await expect(page.getByTestId("gradingResult").filter({ hasText: "OK"})).toHaveCount(0);
  });

test('Good submission pass the test', async ({ page }) => {
	await page.goto('http://localhost:7800/');
	await page.getByTestId('writeCode').click();
	await page.getByTestId('writeCode').fill('def hello(): return "Hello"');
	await page.getByTestId("submitCode").click(); 
	await expect(page.getByTestId("gradingResult")).toContainText("OK", { timeout: 15000 });
});

test('Good submission pass the test and can go to the next submission', async ({ page }) => {
  // Good submission pass the test 
	await page.goto('http://localhost:7800/');
	await page.getByTestId('writeCode').click();
	await page.getByTestId('writeCode').fill('def hello(): return "Hello"');
	await page.getByTestId("submitCode").click(); 
	await expect(page.getByTestId("gradingResult")).toContainText("OK", { timeout: 15000 });

  // Can go to the next submission 
  await page.getByTestId('nextAssignment').click(); 
  await expect(page.getByTestId("assignment")).toContainText('Write a function "hello" that returns the string "Hello world!"'); 
});