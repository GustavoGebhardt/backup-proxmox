import { Telegraf } from "telegraf" 
require('dotenv').config()

function sendMessage(text: string){
    const bot = new Telegraf(process.env.BOT_TOKEN!)
    bot.telegram.sendMessage(process.env.CHAT_TOKEN!, text)
}

export default sendMessage;