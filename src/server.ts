import sendMessage from './telegram/sendMessage';
import addRows from './sheets/addRow';
import getBackup from './puppeteer/getBackup';

//addRows("C5", "Aqui estou!")
//sendMessage("Hello, World!")

function main(){

    const date = new Date
    const options = { timeZone: 'America/Sao_Paulo' };
    const dateFuso = date.toLocaleString('pt-BR', options);
    console.log(dateFuso)
    console.log(parseInt(dateFuso.split(" ")[1].split(":")[0]))

    if(dateFuso.split(" ")[1].split(":")[0] == "05"){
        try{
            //getBackup()
            //throw new Error("Falha no codigo");
        } catch(erro){
            sendMessage("ERRO ⚠️\n" + erro + "\nHorario: " + dateFuso.split(" ")[1] + "\nData: " + dateFuso.split(",")[0])
        }
    }
}

main()
setInterval(() => {main()}, 3600000)
//86400000