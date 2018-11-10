/**
 * The dataController module handles all the data.
 * This function is immediately invoked and returns an
 * object containing all the public functions.
 */
var dataControler = (function(){

    // Return an object containing the public API.
    return {

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

    // Return an object containing the public API .
    return {

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
    var data, UI;

    data = dataControler;
    UI = interfaceControler;

    //Return an object containing any functins needed to run the application.
    return {
        run: function(){

        }
    }
})(dataControler, interfaceControler);

controler.run();