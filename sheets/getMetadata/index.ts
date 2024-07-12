import getAuthSheets from "../getAuthSheets";

async function getMetadata() {
    const { auth, googleSheets, spreadsheetId } = await getAuthSheets()
    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    })
    return(metadata)
}

export default getMetadata;