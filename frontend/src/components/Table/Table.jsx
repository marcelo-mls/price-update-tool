import { useEffect, useState } from 'react';

import { fetchAndValidateProducts } from '../../utils/api';
import csvReader from '../../utils/csvReader';

export default function Table() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isInvalidFile, setIsInvalidFile] = useState(true);
  const [tableData, setTableData] = useState(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    const csvData = await csvReader(file)
    setSelectedFile(csvData)
  };

  const handleFileValidation = () => {
    if (!selectedFile) {
      setIsInvalidFile(true)
    } else if (selectedFile.headers.length !== 2
        || selectedFile.data.length === 0
        || !selectedFile.headers.includes('product_code')
        || !selectedFile.headers.includes('new_price')
      ) {
      setIsInvalidFile(true)
    } else {
      setIsInvalidFile(false)
    }
  };

  const fetchApi = async () => {
    const payload = 'payload'
    const response = await fetchAndValidateProducts({payload});
    setTableData(response)
  };

  useEffect(() => {
    handleFileValidation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  return (
    <div>

      <h1>Ferramenta de Atualizar Preço</h1>
      <input type="file" accept=".csv" onChange={handleFileSelect}/>
      <button type='button' disabled={isInvalidFile} onClick={fetchApi}>
        Validar
      </button>
      <button type='button' disabled={false} onClick={()=>{}}>
        Atualizar
      </button>
      
      {tableData && (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Preço Atual</th>
              <th>Novo Preço</th>
              <th>Validação</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((product, index) => (
              <tr key={index}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.currentPrice}</td>
                <td>{product.newPrice}</td>
                <td>{product.validation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  )
}