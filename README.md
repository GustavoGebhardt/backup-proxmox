# Automação Backup Proxmox

Esse projeto foi desenvolvido para suprir uma demanda de verificação de backups do proxmox. A extração dos dados ocorre por meio da API fornecida pelo proprio servidor proxmox, para pegar as informações dos backups. Em seguida por meio da API do Google Sheets acrecenta os dados á uma planilha e realiza comparações de tamanho com backups anteriores, para verificar se o backup ocoreu corretamente. Caso ocorra algum erro durante o processo, ou a validação identifique que o backup não foi realizado corretamente, um bot do Telegram será acionado e enviará uma mensagem ao usuario por meio da biblioteca Telegraf informando o erro ou falha no backup.

## Sumário

- [Instalação](#instalação)
- [Utilização](#utilização)

## Instalação

### Clone o repositório

```bash
git clone https://github.com/GustavoGebhardt/backup-proxmox
cd backup-proxmox
```

### Instale as dependência

```bash
npm i
```

### Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente com os valores apropriados:

```bash
nano .env
```

Exemplo de conteúdo do .env:

```bash
GOOGLE_APPLICATION_CREDENTIALS=/caminho/para/credentials.json
BOT_TOKEN=token-bot-telegram
CHAT_TOKEN=token-chat-telegram
PROXMOX_HOST=host-do-proxmox
PROXMOX_PORT=porta-do-proxmox
PROXMOX_USER=user-do-proxmox
PROXMOX_PASSWORD=password-do-proxmox
PROXMOX_NODE=node-do-proxmox
PROXMOX_STORAGE=armazenamento-do-proxmox
```

### API Proxmox

Navegue até a opção API Tokens no seu servidor proxmox e adicione um novo Token, em seguida entre na aba permições e selecione seu Token. 

Selecionei a opção API Token Permissions e adicione a pirmição de acesso as vm's.

Prencha o "PROXMOX_USER" e o "PROXMOX_PASSWORD" com as informações do usuario da API Token gerada.

### Google Sheets 

Faça uma copia da [planilha](https://docs.google.com/spreadsheets/d/1X9VysCyR4t8l8FSryEkLwbPixvhBE_0wJ9A2KaTDWNM/copy) utilizada pela aplicação.

Siga as instruções neste [vídeo](https://youtu.be/ZjZGczINqe8) para configurar a API do Google Sheets e obter o arquivo de credenciais JSON.

Coloque o caminho para este arquivo na variável de ambiente "GOOGLE_APPLICATION_CREDENTIALS".

### Bot Telegram

Crie um bot no Telegram através do @BotFather e obtenha o token do bot.

Coloque esse token na variável "BOT_TOKEN".

Obtenha o chat ID para o qual o bot deve enviar mensagens por meio deste link:

```bash
https://api.telegram.org/bot{token-do-seu-bot}/getUpdates
```

```bash
{
    "result": [
        {
            "message": {
                "chat": {
                    "id": seu-chat-id,
                }
            }
        }
    ]
}
```

Coloque-o na variável "CHAT_TOKEN".

## Utilização

Build do código.

```bash
npm run build
```

Executar o código.

```bash
npm run start
```
