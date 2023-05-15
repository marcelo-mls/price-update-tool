import { useEffect, useState } from 'react';

import { fetchAndValidateProducts } from '../../utils/api';
import csvReader from '../../utils/csvReader';
import formatCurrency from '../../utils/formatCurrency'

export default function Table() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isInvalidFile, setIsInvalidFile] = useState(true);
  const [feedback, setFeedback] = useState(false);
  const [tableData, setTableData] = useState(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    const csvData = await csvReader(file)
    setSelectedFile(csvData)
  };

  const handleFileValidation = () => {
    if (!selectedFile) {
      setIsInvalidFile(true)
      setFeedback(false)
    } else if (selectedFile.headers.length !== 2
        || selectedFile.data.length === 0
        || !selectedFile.headers.includes('product_code')
        || !selectedFile.headers.includes('new_price')
      ) {
      setIsInvalidFile(true)
      setFeedback(true)
    } else {
      setIsInvalidFile(false)
      setFeedback(false)
    }
  };

  const fetchApi = async () => {
    const response = await fetchAndValidateProducts(selectedFile.data);
    setTableData(response.data)
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

      {feedback && (
        <div style={{ color: 'red' }}>
          <p><strong>Arquivo inválido!</strong></p>
          <p>Era esperado um arquivo CSV com 2 colunas (<strong>product_code</strong> e <strong>new_price</strong>) e pelo menos 1 registro.</p>
          <p>Seu arquivo contém {selectedFile.data.length} registro(s) e {selectedFile.headers.length} colunas: {selectedFile.headers.join(', ')}.</p>
        </div>
      )}
      
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
                <td>{formatCurrency(product.currentPrice)}</td>
                <td>{formatCurrency(product.newPrice)}</td>
                <td>{product.validation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  )
}