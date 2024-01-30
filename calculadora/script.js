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

function addDigit(digit){ //funcao para add o digito ao visor
    if (addDigit === "," && (currentNumber.includes(",") || !currentNumber)) //ver se já tem uma virgula se tiver ele retorna
    return;

    if (restart){ 
        currentNumber = digit;
        restart = false;  //vai ser true apenas quando eu calcular 
    }else{
        currentNumber += digit; //se nao, ele apenas segue concatenando um num no outro (123)...
    }

    updateResultado(); //função para atualizar em tela isso
}

function setOperador(newOpe){ //recebe o op por parametro
    if(currentNumber){        //verifica se tem algum num atual
        calculate();

        firstOpe = parseFloat(currentNumber.replace(",", ".")); //o que tiver vira o primeiro op e o  num atual fica vazio
        currentNumber = "";
    }

    operador = newOpe;
}


function calculate(){ //aqui faz o calculo
    if(operador === null || firstOpe === null) result; //verfica se tem o primeiro num e o operador para poder calcular
    let secondOpe = parseFloat(currentNumber.replace(",", ".")); //pega o segundo operador que é o num atual e troca a virgula pra ponta pra fzer o calc
    let ValorFinal;  //onde vou guardar o resultado da ope

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
         //feito o calculo isso acontece:  isso significa que apos eu clicar em = o próximo num que eu clicar o visor já reinicia
    operador = null;
    firstOpe = null;
    restart = true; 
    updateResultado();  //atualiza no visor o resultado da ope
}

function clearCalculator(){
    currentNumber = "";   //num atual fica vazio
    firstOpe = null;    //tudo vazio
    operador = null;
    updateResultado (true);  //atualiza pra ficar vazio
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
    }else if(["+","-","x","÷"].includes(TextoBotao)) {    // 1)coloca os op em um array  2)verificar se o btn clicado é um operador atraves do includes() se sim, chama o setOperador()
        setOperador(TextoBotao)     //função que verifica se o btn que cliquei é um operador
    }else if(TextoBotao === "="){   //clico no = e chama o calcular
        calculate();                //CALCULO REAL - alma da calculadora esta aqui
    }  else if (TextoBotao === "C") {
        clearCalculator();    //função para limpar o visor
    } else if (TextoBotao === "±") {
        currentNumber = (                //parte do code que muda o tipo do numero (positivo ou negativo)
          parseFloat(currentNumber || firstOpe) * -1
        ).toString();
        updateResultado();
      } else if (TextoBotao === "%") {
        setPercentage();                //calcula a porcentagem
      }
    })
})
