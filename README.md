# Automação Backup Proxmox

Esse projeto foi desenvolvido para suprir uma demanda de verificação de backups do proxmox. A extração dos dados ocorre por meio da biblioteca Puppeteer, onde realiza buscas no codigo HTML do servidor Proxmox para pegar as informações dos backups. Em seguida por meio da API do Google Sheets acrecenta os dados á uma planilha e realiza comparações de tamanho com backups anteriores, para verificar se o backup ocoreu corretamente. Caso ocorra algum erro durante o processo, ou a validação identifique que o backup não foi realizado corretamente, um bot do Telegram será acionado e enviará uma mensagem ao usuario por meio da biblioteca Telegraf informando o erro ou falha no backup.

## Sumário

- [Instalação](#instalação)
- [Utilização](#utilização)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

### Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
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

### Credenciais do Google Sheets 

Siga as instruções neste [vídeo](URL) para configurar a API do Google Sheets e obter o arquivo de credenciais JSON.

Coloque o caminho para este arquivo na variável de ambiente "GOOGLE_APPLICATION_CREDENTIALS".

### Bot do Telegram

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