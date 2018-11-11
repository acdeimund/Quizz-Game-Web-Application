/**
 * The interfaceController module handles the user interface.
 * This function returns an object containing all the public functions.
 */
function createView(){
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
}