# Automação Backup Proxmox

Esse projeto foi desenvolvido para suprir uma demanda de verificação de backups do proxmox. A extração dos dados ocorre por meio da biblioteca Puppeteer, onde realiza buscas no codigo HTML do servidor Proxmox para pegar as informações dos backups. Em seguida por meio da API do Google Sheets acrecenta os dados á uma planilha e realiza comparações de tamanho com backups anteriores, para verificar se o backup ocoreu corretamente. Caso ocorra algum erro durante o processo, ou a validação identifique que o backup não foi realizado corretamente, um bot do Telegram será acionado e enviará uma mensagem ao usuario por meio da biblioteca Telegraf informando o erro ou falha no backup.

## Sumário

- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

### ------

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
npm install
```
### Variáveis de ambiente

```bash
nano .env
```

```bash
GOOGLE_APPLICATION_CREDENTIALS=
BOT_TOKEN=
CHAT_TOKEN=
PROXMOX_HOST=
PROXMOX_PORT=
PROXMOX_USER=
PROXMOX_PASSWORD=
PROXMOX_NODE=
PROXMOX_STORAGE=
```