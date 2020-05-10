const STORE = [
    //question #1
    {
        question: "What is the capital of Bulgaria?",
        options: 
        {
            a: "Budapest",
            b: "Sofia",
            c: "Vienna",
            d: "Beirut"
        },
        answer: "Sofia",
        image: "https://img.jakpost.net/c/2016/12/07/2016_12_07_17372_1481097943._large.jpg",
        imageAlt: "Capital building in Bulgaria"
    },
    //question #2
    {
        question: "What is the capital of Norway?",
        options: 
        {
            a: "Dublin",
            b: "Lima",
            c: "Oslo",
            d: "Stockholm"
        },
        answer: "Oslo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbiVR2-_nsgxypVQmp4MSGMgguOdERKMcWtHIAqZuyZfRY3WqX&usqp=CAU",
        imageAlt: "Town surrounded by mountains in Norway"
    },
    //question #3
    {
        question: "What is the capital of Turkey?",
        options:
        {
            a: "Ankara",
            b: "Tehran",
            c: "Dhaka",
            d: "Damascus"
        },
        answer: "Ankara",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSC_qfh41VLeRUnXQtJ1p9ysG415kUS3yw-Ki42chhxH1f5z5DD&usqp=CAU",
        imageAlt: "Mosque in Tukey" 
    },
    //question #4
    {
        question: "What is the capital of Iceland?",
        options: 
        {
            a: "Ottawa",
            b: "Copenhagen",
            c: "Bern",
            d: "Reykjavik"
        },
        answer: "Reykjavik",
        image: "https://www.mariosadventuresandexpeditions.com/wp-content/uploads/2018/01/BACK-ROADS-NORTHERN-LIGHTS-COVER-PHOTO-MLII-iceland-multi-adventure-tour-4.jpg",
        imageAlt: "Northern lights in the sky in Iceland"
    },
    //question #5
    {
        question: "What is the capital of Belgium?",
        options:
        {
            a: "Prague",
            b: "Brussels",
            c: "Bucharest",
            d: "Cairo" 
        },  
        answer: "Brussels",
        image: "https://www.meininger-hotels.com/blog/wp-content/uploads/2020/02/Brussels-001-768x512.jpg",
        imageAlt: "Capital city center of Belgium"  
    }
];

let questionNumber = 0;
let score = 0;

//when a user clicks on start quiz button 
function startQuiz() {
    $(".button").click(event => {
        displayQuestion();
    });
};

$(startQuiz);

//when a user submits their selected option => checks if selected option is correct or incorrect and displays respective message
function handleSubmit() {
    $("#question-form .button").click(event => {
        event.preventDefault();
        let selectedOption = $("input[name=capital]:checked");
 
        if (!selectedOption[0]) {
            alert("Please select an option!");
            return;
        }  

        const quizItem = STORE[questionNumber];
        if (selectedOption.val() == quizItem.answer) {
            $(selectedOption).siblings("label").addClass("correct-option");
            $(selectedOption).siblings("label").append(`<div class="correct-answer"><strong>Correct!</strong></div>`);
            score++;
        }

        else {
            $(selectedOption).siblings("label").addClass("incorrect-option");
            $(selectedOption).siblings("label").append(`<div class="incorrect-answer"><strong>Oh no!</strong> The correct answer is ${quizItem.answer}.</div>`);
        }
        
        $(event.currentTarget).remove();
        
        let buttonText = "Next";
        if (questionNumber == STORE.length - 1) {
            buttonText = "Finish";
        }

        $("#question-form").append(`<button type="button" class="button">${buttonText}</button>`);
        
        $("input[name=capital]").attr("disabled", true);

        $(".score").text(`Score: ${score}`);
        nextQuestion()
    });
};

//generates next question 
function nextQuestion() {
    $("#question-form .button").click(event => {
        questionNumber++;
        
        if (questionNumber < STORE.length) {
            displayQuestion(); 
        } 
        
        else {
            displayResults();
        }
    });
};

//template to generate each question
function displayQuestion() {
    const quizItem = STORE[questionNumber];
    const questionHtml = $(`
    <div class="container">
        <h2>${quizItem.question}</h2>
        <img src="${quizItem.image}" class="world-map" alt="${quizItem.imageAlt}">

        <form id="question-form">
            <div class="option-item">
                <input type="radio" id="option1" class="option" name="capital" value="${quizItem.options.a}" tabIndex="1">
                <label for="option1">${quizItem.options.a}</label>
            </div> 
                
            <div class="option-item">
                <input type="radio" id="option2" class="option" name="capital" value="${quizItem.options.b}" tabIndex="2">
                <label for="option2">${quizItem.options.b}</label>
            </div> 

            <div class="option-item">
                <input type="radio" id="option3" class="option" name="capital" value="${quizItem.options.c}" tabIndex="3">
                <label for="option3">${quizItem.options.c}</label>
            </div> 

            <div class="option-item">
                <input type="radio" id="option4" class="option" name="capital" value="${quizItem.options.d}" tabIndex="4">
                <label for="option4">${quizItem.options.d}</label>
            </div> 

            <button type="submit" class="button">Submit</button>
         </form>
    </div>
    `)
    $("main").html(questionHtml);
    $(".question-number").text(`Question: ${questionNumber + 1} / ${STORE.length}`);
    $(".score").text(`Score: ${score}`);
    handleSubmit();
};

//generates the results page
function displayResults() {
    const resultsHtml = $(`
        <div class="container">
            <h2>You scored ${score} out of ${STORE.length}!</h2>
        
            <button type="button" id="restart-button" class="button">Restart Quiz!</button>       
        </div>
    `);  
    $("main").html(resultsHtml);   
    handleRestart();   
};

//restarts the quiz
function handleRestart() {
    $("#restart-button").click(event => {
        event.preventDefault();

        score = 0;
        questionNumber = 0;
        displayQuestion();
    });
};
