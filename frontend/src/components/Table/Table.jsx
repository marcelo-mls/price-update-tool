import { useContext } from 'react';

import formatCurrency from '../../utils/formatCurrency'
import FeedbackText from '../FeedbackText/FeedbackText';
import Loading from '../Loading/Loading';
import AppContext from '../../contexts/AppContext';

export default function Table() {
  const {
    tableData,
    selectedFile,
    feedback,
    isLoading,
  } = useContext(AppContext)

  return (   
      <main>
      <Loading isLoading={isLoading} />
      <FeedbackText
        selectedFile={selectedFile}
        feedbackType={feedback}
      />
      
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
                      ? (product.validation.map((error, idx) =>
                        (<p style={{ color: 'var(--main-red)' }} key={idx} >{error}</p>)))
                      : (<p style={{ color: 'var(--main-green)' }}>Validado!</p>)
                    }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </main>
  )
}