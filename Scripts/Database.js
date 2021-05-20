// Load Fauna Stuff
let NoCalls = 0;
let NoPosts = 0;

// Load DataBase from Fauna /// change to read only only on question
function GetDataBase() {
NoCalls++;
fetch("http://167.71.78.185/questions").then(async (response) => {
questions = await response.json();
console.log(`Got questions, ${questions.length}`);
});
}

// Update dataBase
/**
* @param {number} questionNumber
* @param {'yes'| 'no'} answer
*/
function UpdateDataBase(questionNumber, answer) {
NoPosts++;
logger("GetDataBase", `Calls: ${NoCalls}, Posts: ${NoPosts}`);
fetch("http://167.71.78.185/answer", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ questionNumber: questionNumber, answer: answer }),
}).then(async (res) => console.log(await res.text()));
}
