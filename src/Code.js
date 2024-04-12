function complete_boudget() {
    
  // Select the spreadsheet name boudget in the user google sheet
  /*
    - var id is imported from the id.js file
    - var dict is imported from the dataDict.js file
  */
  var spreadsheet = SpreadsheetApp.openById(id);
  var sheet = spreadsheet.getSheetByName('data');
  /*
  Parse Column C to check wether it contains a dict key or not
  */
  
  var lastRow = sheet.getLastRow();

  // Obtenez toutes les valeurs de la colonne C, K, L en une seule fois
  var columnCValues = sheet.getRange(2, 3, sheet.getLastRow() - 1).getValues();
  var columnKValues = sheet.getRange(2, 11, sheet.getLastRow() - 1).getValues();
  var columnLValues = sheet.getRange(2, 12, sheet.getLastRow() - 1).getValues();
  var columnMValues = sheet.getRange(2, 13, sheet.getLastRow() - 1).getValues();
  var columnNValues = sheet.getRange(2, 14, sheet.getLastRow() - 1).getValues();

  // Préparez un tableau pour stocker les nouvelles valeurs pour les colonnes K à N
  var newValues = [];

  for (var i = 0; i < columnCValues.length; i++) { //
    if (i > 1000) { // Limit the loop size
      break;
    }
    var cellString = columnCValues[i][0];
    var cellK = columnKValues[i][0];
    var cellL = columnLValues[i][0];
    var cellM = columnMValues[i][0];
    var cellN = columnNValues[i][0];
    //Check if there is a already a value in column K or L if so, we skip the cell
    if (cellK != '' || cellL != '') {
      newValues.push([cellK, cellL, cellM, cellN]); // Keep old values
      continue;
    }

    var found = false;
    for (const [key, value] of Object.entries(dict)) {
      if (cellString.toString().includes(key)) {
        newValues.push(value.slice(0, 4)); // Si la clé est trouvée, ajoutez les valeurs du dictionnaire au tableau
        Logger.log(`${cellString} | ${key}: ${value[0]}`);
        found = true;
        break;
      }
    }
    
    if (!found) { 
      newValues.push(['', '', '', '']); // Si aucune clé n'est trouvée, ajoutez des chaînes vides au tableau
      }
    
    // Écrivez toutes les nouvelles valeurs en une seule fois
    sheet.getRange(2, 11, newValues.length, 4).setValues(newValues);
  }
}
  