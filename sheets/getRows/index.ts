import getAuthSheets from "../getAuthSheets";

async function getRows() {
    const { auth, googleSheets, spreadsheetId } = await getAuthSheets()
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "m10227!A1:BO30"
    })
    return(getRows)     
}

export default getRows;