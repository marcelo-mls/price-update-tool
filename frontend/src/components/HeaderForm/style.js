import styled from 'styled-components';

export const StyledHeader = styled.header`
  flex-direction: column;
  align-items: center;
  margin: 0 8px 8px 8px;
`;

export const FileInput = styled.input`
  border-radius:8px;
  padding: 0.4em;
  margin: 4px 8px;
  min-width: 256px;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color:var(--main-white);
  color: var(--sec-dark);

  :hover,
  :active,
  :focus { 
    outline: 4px auto var(--main-green);
  }
`;