let runningtotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value)
{
    if(isNaN(value))
    {
        handleSymbol(value);
    }
    else
    {
        handleNumber(value);
    }
    //console.log('buffer',buffer);
    screen.innerText = buffer;
}

function handleSymbol(symbol)
{
    /*if(symbol === "C")
    {
        buffer = "0";
        runningtotal = 0;
    }*/

    console.log('handleSymbol', symbol);
    switch(symbol)
    {
        case 'C':
            buffer = '0';
            runningtotal = 0;
            break;
        case '&equals;':
            if(previousOperator === null)
            {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningtotal;
            runningtotal = 0;
            break;
            case '&larr;':
                if(buffer.length === 1)
                {
                    buffer = '0';
                }
                else
                {
                    buffer = buffer.substring(0, buffer.length - 1);
                }
        case '&times;':
        case '&minus;':
        case '&plus;':
        case '&divide;':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol)
{
    if (buffer === '0')
    {
        return; //do nothing
    }
    const intBuffer = parseInt(buffer);  //or +parseInt

    if(runningtotal === 0)
    {
        runningtotal = intBuffer;
    }
    else
    {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer)
{
    if(previousOperator === '&plus;')
    {
        runningtotal += intBuffer;
    }
    else if(previousOperator === '&minus;')
    {
        runningtotal -= intBuffer;
    }
    else if(previousOperator === '&times;')
    {
        runningtotal *= intBuffer;
    }
    else
    {
        runningtotal /=intBuffer;
    }
}

function handleNumber(numberString)
{
    if(buffer === "0")
    {
        buffer = numberString;
    }
    else
    {
        buffer = buffer + numberString;
    }
    
}

function init()
{
    document.querySelector('.calc-button')
    .addEventListener('click', function(event)
    {
        buttonClick(event.target.innerText);
    })
}

init();