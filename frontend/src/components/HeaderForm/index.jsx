import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import AppContext from '../../contexts/AppContext';
import csvReader from '../../utils/csvReader';
import { fetchAndValidateProducts, updateProducts } from '../../utils/api';
import { StyledHeader, FileInput } from './style';

export default function HeaderForm() {
  const inputRef = useRef(null);

  const [disableValidateBtn, setDisableValidateBtn] = useState(true);
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(true);

  const {
    tableData,
    setTableData,
    selectedFile,
    setSelectedFile,
    setFeedbackType,
    setIsLoading,
  } = useContext(AppContext)

  const resetComponents = () => {
    setTableData(null)
    setDisableUpdateBtn(true)
  };

  const fetchApi = async () => {
    setFeedbackType(null);
    setIsLoading(true);

    try {
      const response = await fetchAndValidateProducts(selectedFile.data);
      if (response.status !== 200) return toast.error('Ops! Algo deu errado.');
      handleDataValidation(response.data);
      setTableData(response.data);
      toast.success('Validação Concluída!');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      const response = await updateProducts(tableData);
      inputRef.current.value = null;
      resetComponents();
      if (response.status === 200) toast.success('Atualização Concluída!');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (event) => {
    resetComponents();
    const file = event.target.files[0]
    const csvData = await csvReader(file)
    setSelectedFile(csvData)
  };

  const handleFileValidation = () => {
    if (!selectedFile) {
      setDisableUpdateBtn(true);
      setFeedbackType('error');

    } else {
      const { headers, data } = selectedFile;
      const isValidFile = headers.length === 2
        && data.length > 0
        && headers.includes('product_code')
        && headers.includes('new_price');

      setDisableValidateBtn(!isValidFile);
      setFeedbackType(isValidFile ? 'success' : 'error');
    }
  };

  const handleDataValidation = (data) => {
    const isValidData = data.every((row) => row.validation.length === 0)
    setDisableUpdateBtn(!isValidData)
  };

  useEffect(() => {
    handleFileValidation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  return (
    <StyledHeader>
      <h1>Ferramenta de Atualização de Preços</h1>
      <div>
        <FileInput type="file" accept=".csv" ref={inputRef} onChange={handleFileSelect}/>
        <button type='button' disabled={disableValidateBtn} onClick={fetchApi}>Validar</button>
        <button type='button' disabled={disableUpdateBtn} onClick={handleUpdate}>Atualizar</button>
      </div>
    </StyledHeader>
  );
}