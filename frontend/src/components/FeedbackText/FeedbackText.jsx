import PropTypes from 'prop-types';
import AppContext from '../../contexts/AppContext';
import { useContext } from 'react';

export default function FeedbackText() {
  const {
    selectedFile,
    feedbackType,
  } = useContext(AppContext)

  return(
    <>
      {selectedFile && (
        <>
          {feedbackType && feedbackType === 'success' && (
            <div style={{ color: 'var(--main-green)' }}>
              <p><strong>Arquivo carregado com sucesso!</strong></p>
              <p>Seu arquivo CSV contém {selectedFile.data.length} registro(s)!</p>
            </div>
          )}
          {feedbackType && feedbackType === 'error' && (
            <div style={{ color: 'var(--main-red)' }}>
              <p><strong>Arquivo inválido!</strong></p>
              <p>Era esperado um arquivo CSV com 2 colunas (<strong>product_code</strong> e <strong>new_price</strong>) e pelo menos 1 registro.</p>
              <p style={{ lineHeight: 0 }}>Seu arquivo contém {selectedFile.data.length} registro(s) e {selectedFile.headers.length} coluna(s):</p>
              <ol>
                {selectedFile.headers.map((header, idx) => (<li key={idx}>{header}</li>))}
              </ol>
            </div>
          )}
        </>
      )}
    </>
  )
}

FeedbackText.propTypes = {
  feedback: PropTypes.array,
  feedbackType: PropTypes.string,
}.isRequired;