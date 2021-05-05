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
        .query(
            q.Paginate(q.Match(q.Index("AllDemQuestions")))

            )

        .then((ret) => {
            questions = ret.data;
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
    if(Answer == 'yes'){
        client
        .query(
            q.Map(q.Paginate(q.Match(q.Index('QuestionArrNum'),Num)),
            q.Lambda(
                'X',
                q.Update(
                  q.Var('X'),
                  {
                    data: {
                        Total: q.Add(
                        q.Select(['data', 'Total'], q.Get(q.Var('X'))),
                        1
                      ),
                      Yes: q.Add(
                        q.Select(['data', 'Yes'], q.Get(q.Var('X'))),
                        1
                      )
                    }
                  }
                )
            )
        )
        )
        .then((ret) => console.log(ret))
        .catch((err) => console.error("Error: %s", err));
    }else{
        client
        .query(
            q.Map(q.Paginate(q.Match(q.Index('QuestionArrNum'),Num)),
            q.Lambda(
                'X',
                q.Update(
                  q.Var('X'),
                  {
                    data: {
                        Total: q.Add(
                        q.Select(['data', 'Total'], q.Get(q.Var('X'))),
                        1
                      ),
                      No: q.Add(
                        q.Select(['data', 'No'], q.Get(q.Var('X'))),
                        1
                      )
                    }
                  }
                )
            )
        )
        )
        .then((ret) => console.log(ret))
        .catch((err) => console.error("Error: %s", err));
    }
    
}
