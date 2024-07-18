import sendMessage from './telegram/sendMessage';
import addRows from './sheets/addRow';
import getRows from './sheets/getRows';
import getBackup from './proxmox/getBackup';

function convertForDay(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const day = ("0" + date.getDate()).slice(-2);

    return day;
}


async function setBackup(dateFuso: string) {
    const backup = await getBackup()
    const planilha = (await getRows()).data.values
    const alfabeto: string[] = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    
    let row: number = 0
    let ids: any[] = []
    let order: string[] = []
    let backupOnly: any[] = []
    
    for(let i = 0; i < planilha!.length; i++){
        if(planilha![i][0] == dateFuso.split(",")[0]){
            row = i+1
        }
    }
    
    for(let i = 0; i < planilha![0].length; i++){
        ids.push(planilha![0][i])
    }

    for(let i = 0; i < ids.length; i++){
        let decimal = 0
        if(!alfabeto[i]){
            for(let x = 0; x < 26; x++){
                if(order.length > ids.length){
                    break
                }
                order.push((alfabeto[((i-26)*26/26)]+alfabeto[x]))
            }
        } else {
            order.push(alfabeto[i])
        }
        
    }
    
    for(let i = 0; i < backup.length; i++){
        if(backup[i].content == 'backup' && convertForDay(backup[i].ctime) == dateFuso.split("/")[0]){
            backupOnly.push(backup[i])
        }
    }
    
    for(let i = 0; i < ids.length; i++){
        if(ids[i] == "ID" || ids[i] == ""){
            ids.splice(i, 1)
        } else {
            ids[i] = parseInt(ids[i])
        }
    }

    for(let i = 0; i < order.length; i++){
        if(i != 0 && i%2 != 0){
            if(!backupOnly[0] || ids[0] != backupOnly[0].vmid){
                addRows((order[i]+row), "x")
                ids.shift()
            } else {
                addRows((order[i]+row), backupOnly[0].size)
                backupOnly.shift()
                ids.shift()
            }
            
        }
    }
}

async function checkBackup(dateFuso: string){
    const backup = await getBackup()
    let backupOnly: any[] = []

    let toDay: number = parseInt(dateFuso.split("/")[0])
    let oneDayAgo: number = parseInt(dateFuso.split("/")[0])-1
    let twoDaysAgo: number = parseInt(dateFuso.split("/")[0])-2

    let toDayBackup: any[] = []
    let oneDayAgoBackup: any[] = []
    let twoDaysAgoBackup: any[] = []

    //Realiza um filtro no retorno da api deixando somente os backups
    for(let i = 0; i < backup.length; i++){
        if(backup[i].content == 'backup'){
            backupOnly.push(backup[i])
        }
    }

    //Adiciona o backup no array da sua data de realização
    for(let i = 0; i < backupOnly.length; i++){
        if(parseInt(convertForDay(backupOnly[i].ctime)) == toDay){
            toDayBackup.push(backupOnly[i])
        }
        else if(parseInt(convertForDay(backupOnly[i].ctime)) == oneDayAgo){
            oneDayAgoBackup.push(backupOnly[i])
        }
        else if(parseInt(convertForDay(backupOnly[i].ctime)) == twoDaysAgo){
            twoDaysAgoBackup.push(backupOnly[i])
        }
    }
    console.log(toDayBackup)

    //Valida se os arrays possuem a mesma quantidade de backups
    if(toDayBackup.length == oneDayAgoBackup.length && oneDayAgoBackup.length == twoDaysAgoBackup.length){
        for(let i = 0; i < toDayBackup.length; i++){
            //Valida se os tres backups não possuem o mesmo tamanho 
            if(toDayBackup[i].size == oneDayAgoBackup[i].size && oneDayAgoBackup[i].size == twoDaysAgoBackup[i].size){
                sendMessage("ALERTA ⚠️\n" + `"${toDayBackup[i].notes}"` + " está com 3 backups com o mesmo tamanho!" + "\nHorario: " + dateFuso.split(" ")[1] + "\nData: " + dateFuso.split(",")[0])
            }
        }
    } else {
        //throw new Error("Falha no codigo");
    }
    
}

async function main(){
    const date = new Date
    const options = { timeZone: 'America/Sao_Paulo' };
    const dateFuso = date.toLocaleString('pt-BR', options);
    console.log(dateFuso)

    if(dateFuso.split(" ")[1].split(":")[0] == "14"){
        try{
            await setBackup(dateFuso)
            await checkBackup(dateFuso)
            //throw new Error("Falha no codigo");
        } catch(erro){
            sendMessage("ERRO ❌\n" + erro + "\nHorario: " + dateFuso.split(" ")[1] + "\nData: " + dateFuso.split(",")[0])
        }
    }
}

main()
//setInterval(() => {main()}, 3600000)