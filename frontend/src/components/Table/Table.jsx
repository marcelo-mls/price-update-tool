import { useState } from 'react';

import { fetchAndValidateProducts } from '../../utils/api';

export default function Table() {
  const [tableData, setTableData] = useState([])

  const fetchApi = async () => {
    const payload = 'payload'
    const response = await fetchAndValidateProducts({payload});
    setTableData(response.data)
  };

  return (
    <div>

      <h1>Ferramenta de Atualizar Preço</h1>
      <input
        type="file"
        accept=".csv"
        onChange={()=>{}}
      />
      <button
        type='button'
        disabled={false}
        onClick={fetchApi}
      >
        Validar
      </button>
      <button
        type='button'
        disabled={false}
        onClick={()=>{}}
      >
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