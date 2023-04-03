(function() {
  // variable to store our current state
  var cbstate;
  var localData;
  
  // bind to the onload event
  window.addEventListener('load', function() {
    // Get the current state from localstorage
    // State is stored as a JSON string
    cbstate = JSON.parse(localStorage['CBState'] || '{}');
    localData = JSON.parse(localStorage['localData'] || '{}');


    // Loop through state array and restore checked 
    // state for matching elements
    for(var i in cbstate) {
      var el = document.querySelector('input[name="' + i + '"]');
      if (el) el.checked = true;
    }
  
    // Get all checkboxes that you want to monitor state for
    var cb = document.getElementsByClassName('save-check');
  
    // Loop through results and ...
    for(var i = 0; i < cb.length; i++) {
  
      //bind click event handler
      cb[i].addEventListener('click', function(evt) {
        // If checkboxe is checked then save to state
        if (this.checked) {
          cbstate[this.name] = true;
        }
    
    // Else remove from state
        else if (cbstate[this.name]) {
          delete cbstate[this.name];
        }
    
    // Persist state
        localStorage.CBState = JSON.stringify(cbstate);
      });
    }

    
    // var click = document.getElementById('submit');
    // click.addEventListener('click', addData)
    // arr = {};
    // function addData(){
    //     // DeleteData();
    //     arr = {};
    //     arr.items1 = document.getElementById('userInput').value,
    //     arr.items2 = document.getElementById('userInput1').value,
    //     arr.items3 = document.getElementById('userInput2').value,
    //     arr.items4 = document.getElementById('userInput3').value,
    //     arr.items5= document.getElementById('userInput4').value,
    //     arr.items6= document.getElementById('userInput5').value,
    //     localStorage.localData = JSON.stringify(arr);

    // }
    // window.onload=function(){
    //   document.getElementById('userInput').value = "pro";
    //   // console.log(JSON.parse(localStorage.getItem("localData")))
    // }

  });
})();