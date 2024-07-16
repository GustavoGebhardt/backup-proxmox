import { Agent, setGlobalDispatcher } from 'undici'
require('dotenv').config()

async function getTicket(){
    const agent = new Agent({
        connect: {
          rejectUnauthorized: false
        }
    })
    setGlobalDispatcher(agent)

    const data = {
        username: process.env.PROXMOX_USER!,
        password: process.env.PROXMOX_PASSWORD!
    }
    
    const respose = await fetch(`https://${process.env.PROXMOX_HOST}:${process.env.PROXMOX_PORT}/api2/json/access/ticket`, {
        method: "POST",
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(data),
    })

    const returned = await respose.json()

    return "PVEAuthCookie="+(await returned.data.ticket)
}

export default getTicket;