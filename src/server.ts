import sendMessage from './telegram/sendMessage';
import addRows from './sheets/addRow';
import getRows from './sheets/getRows';
import getBackup from './proxmox/getBackup';

async function setBackup(dateFuso: string) {
    const backup = await getBackup()
    const planilha = (await getRows()).data.values
    const alfabeto: string[] = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    
    let row: number = 0
    let ids: number[] = []
    let order: string[] = []
    
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
        if(backup[i].content == 'backup'){
            console.log(backup[i].vmid)
        }
    }

    for(let i = 0; i < order.length; i++){
        if(i != 0 && i%2 != 0){
            console.log(ids[i])
            addRows((order[i]+row), backup[0].size)
        }
    }
}

async function checkbackup(dateFuso: string){
    const planilha = (await getRows()).data.values
    let toDay: number = 0
    let oneDaysAgo: number = 0
    let twoDaysAgo: number = 0

    for(let i = 0; i < planilha!.length; i++){
        if(planilha![i][0] == dateFuso.split(",")[0]){
            toDay = i
            oneDaysAgo = i-1
            twoDaysAgo = i-2
        }
    }
    console.log(planilha![toDay], planilha![oneDaysAgo], planilha![twoDaysAgo])
}

async function main(){
    const date = new Date
    const options = { timeZone: 'America/Sao_Paulo' };
    const dateFuso = date.toLocaleString('pt-BR', options);

    if(dateFuso.split(" ")[1].split(":")[0] == "16"){
        try{
            setBackup(dateFuso)
            checkbackup(dateFuso)
            //throw new Error("Falha no codigo");
        } catch(erro){
            sendMessage("ERRO ⚠️\n" + erro + "\nHorario: " + dateFuso.split(" ")[1] + "\nData: " + dateFuso.split(",")[0])
        }
    }
}

main()
//setInterval(() => {main()}, 3600000)