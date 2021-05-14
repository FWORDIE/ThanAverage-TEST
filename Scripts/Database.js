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
    logger('GetDataBase',`Calls: ${NoCalls}, Posts: ${NoPosts}`);
    client
        .query(
            q.Paginate(q.Match(q.Index("AllDemQuestions")))

            )

        .then((ret) => {
            questions = ret.data;
            logger('GetDataBase',questions);
        })
        .catch((err) => console.error("Error: %s", err));
}

// Update Fauna DataBase
function UpdateDataBase(Num, Answer) {
    NoPosts ++;
    logger('GetDataBase',`Calls: ${NoCalls}, Posts: ${NoPosts}`);
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
        .then((ret) => logger('UpdateDataBase',ret))
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
        .then((ret) => logger('UpdateDataBase',ret))
        .catch((err) => console.error("Error: %s", err));
    }
    
}
