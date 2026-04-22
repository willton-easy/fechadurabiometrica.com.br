const XLSX = require('xlsx');

const paths = [
    'C:/Users/willt/OneDrive/Desktop/SILO_FECHADURAS_DIGITAIS_Otimizado.xlsx',
    'C:/Users/willt/OneDrive/Desktop/SILO_FECHADURAS_HOT.xlsx'
];

paths.forEach(p => {
    try {
        const workbook = XLSX.readFile(p);
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
        console.log(`\n\n--- FILE: ${p} ---`);
        // Lendo as 20 primeiras linhas da planilha (que geralmente contêm as top oportunidades)
        rows.slice(0, 20).forEach(row => console.log(row.join(' | ')));
    } catch(err) {
        console.log(`Error reading ${p}: ${err.message}`);
    }
});
