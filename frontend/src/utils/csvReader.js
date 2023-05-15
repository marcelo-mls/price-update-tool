import Papa from 'papaparse';

export default function csvReader(csvFile) {
  return new Promise((resolve) => {
    const configObject = {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve({data: result.data, headers: result.meta.fields})
    }

    Papa.parse(csvFile, configObject)
  })
}
