import { useContext, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

import AppContext from '../../contexts/AppContext';
import csvReader from '../../utils/csvReader';
import { fetchAndValidateProducts, updateProducts } from '../../utils/api';
import { StyledHeader, FileInput } from './style';

export default function HeaderForm() {
  const inputRef = useRef(null);

  const {
    tableData,
    setTableData,
    selectedFile,
    setSelectedFile,
    isFileValid,
    setIsFileValid,
    setFeedbackType,
    isDataValid,
    setIsDataValid,
    setIsLoading,
  } = useContext(AppContext)

  const resetComponents = () => {
    setTableData(null)
    setIsDataValid(true)
  };

  const fetchApi = async () => {
    setFeedbackType(null);
    setIsLoading(true);

    try {
      const response = await fetchAndValidateProducts(selectedFile.data);
      if (response.status !== 200) {
        setIsLoading(false);
        return toast.error('Ops! Algo deu errado.');
      }
      handleDataValidation(response.data);
      setTableData(response.data);
      setIsLoading(false);
      toast.success('Validação Concluída!');

    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('Ops! Algo deu errado.');
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      const response = await updateProducts(tableData);
      inputRef.current.value = null;
      resetComponents();
      setIsLoading(false);

      if (response.status === 200) {
        toast.success('Atualização Concluída!');
      } else {
        toast.error('Ops! Algo deu errado.');
      }

    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('Ops! Algo deu errado.');
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
      setIsDataValid(true);
      setFeedbackType('error');

    } else {
      const { headers, data } = selectedFile;
      const isValidFile =
        headers.length === 2 &&
        data.length > 0 &&
        headers.includes('product_code') &&
        headers.includes('new_price');

      setIsFileValid(!isValidFile);
      setFeedbackType(isValidFile ? 'success' : 'error');
    }
  };

  const handleDataValidation = (data) => {
    const isValidData = data.every((row) => row.validation.length === 0)
    setIsDataValid(!isValidData)
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
        <button type='button' disabled={isFileValid} onClick={fetchApi}>Validar</button>
        <button type='button' disabled={isDataValid} onClick={handleUpdate}>Atualizar</button>
      </div>
    </StyledHeader>
  );
}