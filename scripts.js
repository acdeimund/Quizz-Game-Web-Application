/**
 * The dataController module handles all the data.
 * This function is immediately invoked and returns an
 * object containing all the public functions.
 */
var dataControler = (function(){
    var questionsList = [], currentQuestion, final;

    final = false;

    /**
     * Describes a Question with corrosponding answers.
     */
    class Question{

        /**
         * Creates a Question object.
         * @param {string} questionText the question's text.
         * @param {string[]} answers a list of all possible answers.
         * @param {number} correctAnswer the index of the correct answer. 
         */
        constructor(questionText, answers, correctAnswer){
            this.questionText = questionText;
            this.answers = answers;
            this.correctAnswer = correctAnswer;
            this.asked = false;
        }    
    }



    // Return an object containing the public API.
    return {

        /**
        * Create the questions.
        */
        addQuestions: function(){
            var answers1 = ["Aaron", "Jim", "Mike", "Joe"];
            questionsList.push(new Question("Who wrote this program?", answers1, 0));

            var answers2 = ["Jennie", "Katie", "Liam", "Thelma"];
            questionsList.push(new Question("Who is Aaron's son?", answers2, 2));

            var answers3 = ["Yes", "No", "Maybe", "Ask again later"];
            questionsList.push(new Question("Am I the greatest programmer who ever lived?", answers3, 0));

            var answers4 = ["violin", "clarinet", "oboe", "kazoo", "bass"];
            questionsList.push(new Question("What insterment does Aaron's son play?", answers4, 2));
        },
            
        /**
         * Checks an answer against the current question.
         * @param {number} answer the answer given by the user. 
         */
        checkAnswer: function(answer){
            return parseInt(answer) === currentQuestion.correctAnswer; 
        },

        /**
         * Updates currentQuestion to an unasked question and returns true.
         * Returns false if there are no other questions.
         */
        getNextQuestion: function(){   
            var questionsLeft, running;
            
            questionsLeft = false;
            running = true;

            // Test if there are any questions left to ask. Could be optimized.
            questionsList.forEach(function(cur){
                if(!cur.asked){
                    questionsLeft = true;
                }
            });

            // If there are questions in the list that have not been asked, get a random one.
            if (questionsLeft){                
                
                //Loop through questions until an unasked one is found. Could be optimized.
                while(running){
                    var random = Math.floor(Math.random() * questionsList.length);
                    if (!questionsList[random].asked){
                        questionsList[random].asked = true;
                        currentQuestion = questionsList[random];
                        running = false;
                    }
                }
            }
            return questionsLeft;
        },

        getCurrentQuestion: function(){
            return currentQuestion;
        },

        /**
         * Resets the 'asked' variable for each question.
         */
        resetQuestions: function(){
            questionsList.forEach(function(current){
                current.asked = false;
            });
        }
    }

})();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

/**
 * The interfaceController module handles the user interface.
 * This function is immediately invoked and returns an
 * object containing all the public functions.
 */
var interfaceControler = (function(){
    var score, questionText, answerPanel, answerLabels;

    // Define an Array containing labels for the answers.
    answerLabels = ['A: ', 'B: ', 'C: ', 'D: ', 'E: '];

    // Store DOM elements.
    score = document.getElementById('score');
    questionText = document.getElementById('question');
    answerPanel = document.getElementById('answer-panel');

    // Return an object containing the public API .
    return {
        
        /**
         * Resets the DOM elements to thier original state.
         */
        resetInterface: function(){
            score.innerText = 0;
        },

        displayQuestion: function(question){
            var text = '';
            questionText.innerText = question.questionText;
            answerPanel.innerHTML = "";
            question.answers.forEach(function(curr, i){
                text = '<p class = "answer" data-answer = "' + i + '">' + answerLabels[i] + curr;
                answerPanel.insertAdjacentHTML('beforeend', text);
            });
        },

        incrementScore: function(){
            score.innerText = parseInt(score.innerText) + 1;
        }
    }
})();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

/**
 * The controller is responsible for controlling the 
 * communication of the other modules as well as the 
 * flow of the application. All of the other modules 
 * are passed into this one as arguments. Returns an
 * object containing functions to run the application.
 */
var controler = (function(){

    /**
     * Resets the game!
     */
    function resetGame() {
        dataControler.resetQuestions();
        dataControler.getNextQuestion();
        interfaceControler.resetInterface();
        interfaceControler.displayQuestion(dataControler.getCurrentQuestion());
        addAnswerEvents();
    }

    /**
     * Add event listeners to the answers displayed in
     * the display panel.
     */
    function addAnswerEvents(){
        var answers;

        // Create an array containing all '.answers'.
        answers = Array.prototype.slice.call(document.getElementsByClassName("answer"));

        // Add event listeners to each answer.
        answers.forEach(function(curr, i){
            curr.addEventListener('click', function(){
                if(dataControler.checkAnswer(curr.dataset.answer)){
                    interfaceControler.incrementScore();
                    if(dataControler.getNextQuestion()){
                        interfaceControler.displayQuestion(dataControler.getCurrentQuestion());
                        addAnswerEvents();
                    }else{
                        alert('Congratulations! You got them all right!');
                        resetGame();
                    }
                }else{
                    alert('Sorry, that is incorect!');              
                    resetGame();
                }
            });
        });                
    }

    //Return an object containing any functins needed to run the application.
    return {
        /**
         * Gets everythind going.
         */
        run: function(){
            dataControler.addQuestions();
            dataControler.getNextQuestion();
            interfaceControler.displayQuestion(dataControler.getCurrentQuestion());
            addAnswerEvents();
            document.getElementById('new-game').addEventListener('click', function(){
                resetGame();
            });
            
        }
    }
})(dataControler, interfaceControler);

controler.run();