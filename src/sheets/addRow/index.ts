import getAuthSheets from "../getAuthSheets";

async function addRows(celula: string, valor: string) {
    const { auth, googleSheets, spreadsheetId } = await getAuthSheets()
    const addRows = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "m10227!" + celula,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [valor]
            ]
        }
    })
    return(addRows)     
}

export default addRows;