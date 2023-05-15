// import { fetchAndValidateProducts } from '../../services/api';

export default function Table() {
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
        disabled={()=>{}}
        onClick={()=>{}}
      >
        Validar
      </button>
      <button
        type='button'
        disabled={()=>{}}
        onClick={()=>{}}
      >
        Atualizar
      </button>
      
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
              <tr >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </tbody>
        </table>

    </div>
  )
}