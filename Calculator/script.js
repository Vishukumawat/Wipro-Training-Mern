let input = document.getElementById("input");
let buttons = document.querySelectorAll("button");
let output ="";

let arr = Array.from(buttons);
arr.forEach(button =>{
    button.addEventListener("click", (e) =>{
        if(e.target.innerHTML == "="){
            try{
                output =eval(input.value);
                input.value = output;
            }catch{
                input.value = "Error!";
            }
        }else if
            (e.target.innerHTML =="ac"){
                output ="";
                input.value =output;
            }else if(e.target.innerHTML =="del"){
                output = output.substring(0,output.length -1);
                input.value = output;
            }
            
            else {
                output += e.target.innerHTML;
                input.value = output;
            }
            });

    });



