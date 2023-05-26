import styled from 'styled-components';

export const Load = styled.div`
  display: flex; justify-content: center;

  div.loading {
    text-align: center;
    width: 56px;
    height: 26.9px;
    background:
    radial-gradient(circle closest-side,var(--main-green) 90%,#0000) 0%   50%,
    radial-gradient(circle closest-side,var(--main-green) 90%,#0000) 50%  50%,
    radial-gradient(circle closest-side,var(--main-green) 90%,#0000) 100% 50%;
    background-size: calc(100%/3) 13.4px;
    background-repeat: no-repeat;
    animation: loading-dots 1s infinite linear;
  }

  @keyframes loading-dots {
    20% {
        background-position: 0%   0%, 50%  50%,100%  50%;
    }

    40% {
        background-position: 0% 100%, 50%   0%,100%  50%;
    }

    60% {
        background-position: 0%  50%, 50% 100%,100%   0%;
    }

    80% {
        background-position: 0%  50%, 50%  50%,100% 100%;
    }
}
`;