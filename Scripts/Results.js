let ResultsArr = [];
let ResultsPageOpen = false;
let listDone = false;

// Prepare to load Results Window
function ResultsPage() {
    FadeOut();
    if(ResultsPageOpen == false){
        ResultsPageOpen = true;
        runaway();
        setTimeout(LoadRes, Math.round((longestTime * 1000) / 2));
    }else{
        ResultsPageOpen = false;
        setTimeout(QuesBack, Math.round((longestTime * 1000) / 2));
   
    }

}

function AboutPage() {
    FadeOut();
    setTimeout(LoadAboutPage, Math.round((longestTime * 1000) / 2));
}

function LoadAboutPage(){
    if(ResultsPageOpen == true){
        document.getElementById('Results').innerText = "See Results";
        reset();
        ResultsPageOpen = false;
    }
    if(resultState == true){
        reset();
        resultState = false;
    }

    HideOthers(AboutArea);
    FadeIn();
}

// Load Questions Back
function QuesBack(){
    HideOthers(IntroArea);
    document.getElementById('Results').innerText = "See Results";
    reset();
    FadeIn();

}

// Load Results Window
function LoadRes() {
    HideOthers(ListBox);
    DisplayList();
    FadeIn();
    document.getElementById('Results').innerText = "Questions";
}

// Make Result List
function DisplayList() {
    if(listDone == false){
    var options = {
        valueNames: [
            "Percent",
            "StatementTXT",
            "Responses",
            "Question",
            { name: "Class", attr: "style" },
            { name: "Class2", attr: "style" },
        ],
        item:
            '<li id="Question-item" ><h3 class="Percent Class" data-default-order="asc" ><span>%</span></h3><p class="Statement">of participants think they <span class="StatementTXT Class2"></span> than average.</p><p class="Responses">732</p><p class="Question">Q1</p></li>',
    };
    


    var values = GenResultsArray();

    var userList = new List("ListArea", options, values);
    userList.sort("Question", {
        order: "asc",
    });

 

    var instance = OverlayScrollbars(document.getElementById("List"), {
        sizeAutoCapable: true,
        paddingAbsolute: true,
        scrollbars: {
            visibility: "auto",
            autoHide: "never",
            autoHideDelay: 800,
            dragScrolling: true,
            clickScrolling: false,
            touchSupport: true,
            snapHandle: false,
        },
    });
    listDone = true;
}
}

// Generate Results Array
function GenResultsArray() {
    for (let n = 0; n < questions.length; n++) {
        if(questions[n][6] > 500){
        let ResPercent = GenPcent(n);
        let Statement = "";
        let Class = "";
        if (ResPercent < 50) {
            ResPercent = 100 - ResPercent;
            Statement = questions[n][5];
            Class = "color: #E07A5F";
        } else {
            ResPercent = ResPercent - 0;
            Statement = questions[n][4];
            Class = "color: #81B29A";
        }
        ResultsArr.push({
            Percent: Math.round(ResPercent) + "%",
            Responses: questions[n][6],
            Question: "Q" + questions[n][0],
            StatementTXT: Statement,
            Class: Class,
            Class2: Class,
        });
    }
        //console.log(ResultsArr);
    }
    return ResultsArr;
}

function HideOthers(Box){
    gsap.to([ListBox,IntroArea,QuizArea,AboutArea],{display:'none', duration:0});
    gsap.to(Box,{display:'block', duration:0})
}
