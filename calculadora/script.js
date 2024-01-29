const result = document.querySelector('.result'); //pega o result
const buttons = document.querySelectorAll('.buttons button'); //pega todos os botoes do html

let currentNumber = "";    //num atual
let firstOpe = null;      // primeiro num
let operador = null;     //operador
let restart = false;    //restart

//se a origem do update for do clear C, ele vai limpar o resultado pra zero, se nao pega o numero atual 

function updateResultado(originClear = false){ 
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit){
    if (addDigit === "," && (currentNumber.includes(",") || currentNumber))
    return;

    if (restart){
        currentNumber = digit;
        restart = false;
    }else{
        currentNumber += digit;
    }

    updateResultado();
}

function setOperador(newOpe){
    if(currentNumber){
        calculate();

        firstOpe = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }

    operador = newOpe;
}


function calculate(){ //aqui faz o calculo
    if(operador === null || firstOpe === null) result; //verfica se tem o primeiro num e o operador
    let secondOpe = parseFloat(currentNumber.replace(",", ".")); //pega o segundo operador que é o num atual e troca a virgula pra ponta pra fzer o calc
    let ValorFinal;

    //faço um switch para verificar os op e escolher a melhor calculo

    switch(operador){
        case "+":
            ValorFinal = firstOpe + secondOpe;
            break;

        case "-":
            ValorFinal = firstOpe - secondOpe;
            break;

        case "x":
            ValorFinal = firstOpe * secondOpe;
            break;
        case "÷":
            ValorFinal = firstOpe / secondOpe;
            break;
        default:
            return;
            
    }

    //verificação se o resultado tiver +de 5 casas decimais uso tofixed para carregar até 5
    if(ValorFinal.toString().split(".")[1]?.length >5){
        currentNumber = parseFloat(ValorFinal.toFixed(5)).toString();
    }else{
        currentNumber = ValorFinal.toString(); //senao ele só pega o result normal
    }

    operador = null;
    firstOpe = null;
    restart = true;
    updateResultado();
}

function clearCalculator(){
    currentNumber = "";
    firstOpe = null;
    operador = null;
    updateResultado (true);
}

function setPercentage() {
    let result = parseFloat(currentNumber) / 100;
  
    if (["+", "-"].includes(operador)) {
      result = result * (firstOpe || 1);
    }
  
    if (result.toString().split(".")[1]?.length > 5) {
      result = result.toFixed(5).toString();
    }
  
    currentNumber = result.toString();
    updateResultado();
  }

buttons.forEach((button) => { 
    button.addEventListener ("click", () =>{   //para cada botao adiciono um evento de click
    const TextoBotao = button.innerText;      //var para pegar o texto do botao que estou clicando 
    if(/^[0-9]+$/.test(TextoBotao)){         // verificacao com regex, se o texto que estou clicando for de 0 a 9, ou for virgula ele passa no test, e chama a função addDigit passando como paramentro esse texto do btn 
        addDigit(TextoBotao);
    }else if(["+","-","x","÷"].includes(TextoBotao)) {    // verificar se o btn clicado é um operador
        setOperador(TextoBotao)
    }else if(TextoBotao === "="){
        calculate();
    }  else if (TextoBotao === "C") {
        clearCalculator();
    } else if (TextoBotao === "±") {
        currentNumber = (
          parseFloat(currentNumber || firstOpe) * -1
        ).toString();
        updateResultado();
      } else if (TextoBotao === "%") {
        setPercentage();
      }
    })
})