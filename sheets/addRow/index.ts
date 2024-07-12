import getAuthSheets from "../getAuthSheets";

async function addRows() {
    const { auth, googleSheets, spreadsheetId } = await getAuthSheets()
    const addRows = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "m10227!C5",
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                ["teste"]
            ]
        }
    })
    return(addRows)     
}

export default addRows;