/**
 * The dataController module handles all the data.
 * This function returns an object containing all the public functions.
 */
function createModel(){
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
            var answers1, answers2, answers3, answers4;

            answers1 = ["Aaron", "Jim", "Mike", "Joe"];
            questionsList.push(new Question("Who wrote this program?", answers1, 0));

            answers2 = ["Jennie", "Katie", "Liam", "Thelma"];
            questionsList.push(new Question("Who is Aaron's son?", answers2, 2));

            answers3 = ["Yes", "No", "Maybe", "Ask again later"];
            questionsList.push(new Question("Am I the greatest programmer who ever lived?", answers3, 0));

            answers4 = ["violin", "clarinet", "oboe", "kazoo", "bass"];
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
}