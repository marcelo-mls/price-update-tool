import styled from 'styled-components';

export const TdContainer = styled.td`
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const IconButton = styled.button`
  color: var(--sec-dark);
  background-color: transparent;
  border-radius: 4px;
  min-width: 32px;
  min-height: 28px;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;

  :hover {
    color: var(--main-white);
    background-color: var(--sec-dark);
    transform: none;
    box-shadow: none;
    border-color: transparent;
  }

  :active {
    transform: translateY(1px);
    box-shadow: none;
    outline: none;
  }
`;