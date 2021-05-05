const QNumArea = document.getElementById("QNum");
const RNumArea = document.getElementById("RNum");
const QuesArea = document.getElementById("QuesCopy");
const QuesBox = document.getElementById("Question");
const RespBox = document.getElementById("Response");
const RespArea = document.getElementById("RespCopy");
const PercArea = document.getElementById("Percent");
const YesArea = document.getElementById("Yes");
const NoArea = document.getElementById("No");
const NextArea = document.getElementById("Next");
const TextArea = document.getElementById("mainer");
const IntroArea = document.getElementById("IntroArea");
const QuizArea = document.getElementById("QuizArea");
const ListBox = document.getElementById("ListBox");
const AboutArea = document.getElementById("AboutArea");
const NumofQues = questions.length;
var QNum = 0;
var UsedQues = [];
//var UsedQues = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];

// Load New Question Number
function NewQnum() {
    QNum = Math.round(getRandomArbitrary(0, NumofQues - 1));
    if (UsedQues.includes(QNum)) {
        NewQnum();
    } else {
        UsedQues.push(QNum);
        console.log(UsedQues);
        return QNum;
    }
}

// Transition Time
function TransTime() {
    let TransTime = Math.round((longestTime * 1000) / 2);
    if (TransTime < 1500) {
        TransTime = 1500;
    }
    return TransTime + "ms";
}
// Fade In effect
function FadeIn() {
    TextArea.style.opacity = "0.9";
    TextArea.style.transitionDuration = TransTime();
    TextArea.style.filter = "blur(0vw)";
}
// Fade Out Effect
function FadeOut() {
    TextArea.style.opacity = "0";
    TextArea.style.transitionDuration = TransTime();
    TextArea.style.filter = "blur(0.2vw)";
}

// Start Button
function Start() {
    loadQuestion();
}

// Load a new Question in
function loadQuestion() {
    FadeOut();
    TextArea.style.opacity = "0";
    if (UsedQues.length == NumofQues) {
        setTimeout(NoQues, Math.round((longestTime * 1000) / 2));
    } else {
        setTimeout(NewQues, Math.round((longestTime * 1000) / 2));
    }
}

// No More Questions
function NoQues() {
    HideOthers(QuizArea);
    clearstyle();
    QuizArea.innerHTML = '	<p id="IntroText" class="IntroText">You have reached the bottom of the bucket and there are no more questions</p><div class="buttonbox"><a class="button" id="Suggest" href="mailto:thanaverage@mildlyupset.com">Suggest Questions</a><a class="linkbutton" href="https://www.fredwordie.com/"><div class="button" id="Start">See my other projects</div></a></div>';
    FadeIn();
}

// Load Question
function NewQues() {

    HideOthers(QuizArea);

    clearstyle();
    Qnum = NewQnum();
    console.log(questions[QNum]);
    QNumArea.innerText = "Q" + questions[QNum][0];
    QuesArea.innerText = questions[QNum][1];
    YesArea.innerText = "Yes, " + questions[QNum][2];
    NoArea.innerText = "No, " + questions[QNum][3];
    FadeIn();
}

// Record Answer
function Answer(type) {
    FadeOut();
    questions[QNum][6]++;
    let QPcent = GenPcent(QNum);
    let LowQPcent = Math.round(GenPcent(QNum));
    showResults(LowQPcent, false, false);
    setTimeout(() => {
        FadeIn();
        RespBox.style.display = "block";
        Next.style.display = "block";
        QuesBox.style.display = "none";
        YesArea.style.display = "none";
        NoArea.style.display = "none";
        QNumArea.innerText = questions[QNum][6] + " Responses";

        if (type == "yes") {
            PercArea.innerText = LowQPcent + "%";
            RespArea.innerText = questions[QNum][4];
            PercArea.classList.add("greentext");
            RespArea.classList.add("greentext");
            questions[QNum][7]++;
            console.log("yes");
            UpdateDataBase(Qnum+1, "yes");
        } else {
            PercArea.innerText = 100 - LowQPcent + "%";
            RespArea.innerText = questions[QNum][5]
            PercArea.classList.add("redtext");
            RespArea.classList.add("redtext");
            questions[QNum][8]++;
            console.log("no");
            UpdateDataBase(Qnum+1, "no");
        }

        console.log(questions[QNum]);

        console.log(QPcent);
    }, Math.round((longestTime * 1000) / 2));

    
}

// Generate Percent
function GenPcent(Num) {
    let Frac = questions[Num][7] / questions[Num][6];
    let Pcent = (Frac * 100).toFixed(1);
    return Pcent;
}

// Clear Styles Function
function clearstyle() {
    RespBox.style.display = "none";
    Next.style.display = "none";
    QuesBox.style.display = "block";
    YesArea.style.display = "block";
    NoArea.style.display = "block";
    PercArea.classList.remove("redtext");
    RespArea.classList.remove("redtext");
    PercArea.classList.remove("greentext");
    RespArea.classList.remove("greentext");
}

// Next Question
function nextQues() {
    loadQuestion();
    reset();
}
