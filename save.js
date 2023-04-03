var click = document.getElementById('submit');
    click.addEventListener('click', addData)
    arr = {};
    function addData(){
        // DeleteData();
        items1 = document.getElementById('userInput').value;
        
        localStorage.setItem('test', items1);

    }
    window.onload=function(){
      document.getElementById('userInput').value = localStorage.getItem("test");
    }