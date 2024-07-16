import { Agent, setGlobalDispatcher } from 'undici'
import getTicket from '../getTicket'
require('dotenv').config()

async function getBackup(){
    const ticket = await getTicket()

    const agent = new Agent({
        connect: {
          rejectUnauthorized: false
        }
    })
    setGlobalDispatcher(agent)
    
    const respose = await fetch(`https://${process.env.PROXMOX_HOST}:${process.env.PROXMOX_PORT}/api2/json/nodes/${process.env.PROXMOX_NODE}/storage/${process.env.PROXMOX_STORAGE}/content`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Cookie": ticket
        },
    })

    const returned = await respose.json()

    return await returned.data
}

export default getBackup;