import styled from 'styled-components';

export const MyFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  font-size: 0.8em;

  nav {
    width: 192px;
    display: flex;
    justify-content: space-between;
  }

  a {
    opacity: 50%;

    & :hover {
    opacity: 100%;
    }
  }
`;

export const LinkIcons = styled.a`
  opacity: 50%;

  :hover {
  opacity: 100%;
  }
`;