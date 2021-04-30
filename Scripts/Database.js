// Load Fauna Stuff
var faunadb = window.faunadb;
var q = faunadb.query;
var client = new faunadb.Client({
    secret: "fnAEH9qaMKACAZUacat_8gPzT9yf_m85U7fy8kdb",
    domain: "db.fauna.com",
    scheme: "https",
});
// Load DataBase from Fauna
function GetDataBase() {
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
