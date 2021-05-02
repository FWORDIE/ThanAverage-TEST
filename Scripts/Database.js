// Load Fauna Stuff
let NoCalls = 0;
let NoPosts = 0;
var faunadb = window.faunadb;
var q = faunadb.query;
var client = new faunadb.Client({
    secret: "fnAEH9qaMKACAZUacat_8gPzT9yf_m85U7fy8kdb",
    domain: "db.fauna.com",
    scheme: "https",
});
// Load DataBase from Fauna
function GetDataBase() {
    NoCalls ++;
    console.log('Calls: ' + NoCalls + ", Posts: " + NoPosts)
    client
        .query(q.Get(q.Ref(q.Collection("QuestionArr"), "297196213111882241")))

        .then((ret) => {
            questions = ret.data.data;
            console.log(questions);
        })
        .catch((err) => console.error("Error: %s", err));
}

// Test Button
function test4() {
    console.log("high" + GetDataBase());
}

// Update Fauna DataBase
function UpdateDataBase(Num, Answer) {
    NoPosts ++;
    console.log('Calls: ' + NoCalls + ", Posts: " + NoPosts)
    let data = questions;
    client
        .query(
            q.Update(q.Ref(q.Collection("QuestionArr"), "297196213111882241"), {
                data: {
                    data,
                },
            })
        )
        .then((ret) => console.log(ret))
        .catch((err) => console.error("Error: %s", err));
}
