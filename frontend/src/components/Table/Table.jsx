import { useEffect, useState, useRef } from 'react';

import { fetchAndValidateProducts, updateProducts } from '../../utils/api';
import csvReader from '../../utils/csvReader';
import formatCurrency from '../../utils/formatCurrency'

export default function Table() {
  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isInvalidFile, setIsInvalidFile] = useState(true);
  const [feedback, setFeedback] = useState(false);
  const [tableData, setTableData] = useState(null)
  const [isInvalidData, setIsInvalidData] = useState(true);

  const resetComponents = () => {
    setTableData(null)
    setIsInvalidData(true)
  };

  const handleFileSelect = async (event) => {
    resetComponents();
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

  const handleDataValidation = (data) => {
    const isValidData = data.every((row) => row.validation.length === 0)
    setIsInvalidData(!isValidData)
  };

  const fetchApi = async () => {
    const response = await fetchAndValidateProducts(selectedFile.data);
    handleDataValidation(response.data)
    setTableData(response.data)
  };

  const handleUpdate = async () => {
    await updateProducts(tableData);
    inputRef.current.value = null;
    resetComponents();
  };

  useEffect(() => {
    handleFileValidation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  return (
    <div>

      <h1>Ferramenta de Atualizar Preço</h1>
      <input type="file" accept=".csv" ref={inputRef} onChange={handleFileSelect}/>
      <button type='button' disabled={isInvalidFile} onClick={fetchApi}>
        Validar
      </button>
      <button type='button' disabled={isInvalidData} onClick={handleUpdate}>
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
                <td>
                  {
                    product.validation.length > 0
                    ? (<ul style={{ color: 'red' }}>
                        {product.validation.map((error, idx) => (<li key={idx}>{error}</li>))}
                      </ul>)
                    : <span style={{ color: 'green' }}>OK!</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  )
}