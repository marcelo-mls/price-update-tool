import styled from 'styled-components';

export const MainContainer = styled.main`
  border-radius: 8px 8px 0 0;
  max-height: calc(100vh - 35vh);
  overflow-y: auto;
  margin: 8px;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
  min-width: 1024px;
  border-radius: 8px 8px 0 0;
  background-color: var(--main-white);
  color: var(--sec-dark);

  th {
  text-transform: uppercase;
  background-color: var(--main-green);
  position: sticky;
  top: 0;
  }

  td, th {
    padding: 8px 16px;
  }

  td p {
    line-height: 0;
    text-align: left;
    font-weight: 500;
  }

  tbody tr:nth-child(even) {
    background-color: var(--sec-white);
  }
`;