import PropTypes from 'prop-types';
import { MdEdit, MdDelete } from "react-icons/md";

import { TdContainer, IconButton } from './style';

export default function EditAndDeleteRow({product}) {

  const handleDelete = (productName) => {
    const result = window.confirm(`Tem certeza que quer deletar ${productName}?`);
    if (result) {
      console.log('Deleted!');
    } else {
      console.log('Cancelled!');
    }
  };

  return(
    <TdContainer>
      <IconButton type='button' onClick={() => console.log(`edit ${product.name}`)}><MdEdit /></IconButton>
      <IconButton type='button' onClick={() => handleDelete(product.name)}><MdDelete /></IconButton>
    </TdContainer>
  )
}

EditAndDeleteRow.propTypes = {
  product: PropTypes.object,
}.isRequired;