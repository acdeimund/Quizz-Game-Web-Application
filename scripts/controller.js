/**
 * The controller is responsible for controlling the 
 * communication of the other modules as well as the 
 * flow of the application. Returns an
 * object containing functions to run the application.
 */
function createControl(){
    var dataControler, interfaceControler;
    
    dataControler = createModel();
    interfaceControler = createView();

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
         * Gets everything going.
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
}