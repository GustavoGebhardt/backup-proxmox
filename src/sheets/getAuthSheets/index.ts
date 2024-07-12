import { google } from "googleapis";
require('dotenv').config()

async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })
    const client = await auth.getClient();
    const googleSheets = google.sheets({
        version: "v4",
        auth: auth
    })
    const spreadsheetId = "1uu0mrBLIpaKzA8xq1hRHkoA-TqjrHXCKsmpwfNR4Bo8"
    return{
        auth,
        client,
        googleSheets,
        spreadsheetId
    }
}

export default getAuthSheets;