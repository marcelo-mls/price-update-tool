import { useContext } from 'react';

import formatCurrency from '../../utils/formatCurrency'
import FeedbackText from '../FeedbackText';
import Loading from '../Loading';
import AppContext from '../../contexts/AppContext';
import { MainContainer, StyledTable } from './style';

export default function Table() {
  const { tableData } = useContext(AppContext)

  return (   
      <MainContainer>
      <Loading />
      <FeedbackText />
      
      {tableData && (
        <StyledTable>
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
        </StyledTable>
      )}
      </MainContainer>
  )
}