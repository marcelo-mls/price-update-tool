import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --main-white: #f9f9f9;
    --sec-white: #E0E0E0;
    --main-dark: #242424;
    --sec-dark: #1a1a1a;
    --main-red: #DA0C21;
    --main-green: #2FBF71;
    --main-blue: #266DD3;
    --main-yellow: #F5B700;
    
    --large-shadow: 5px 15px 25px rgba(0, 0, 0, 0.5);
    --normal-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    --small-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;

    color: var(--main-white);
    background-color: var(--main-dark);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  * {
    /* margin: 0;
    padding: 0; */
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    min-width: 640px;
    min-height: 100vh;
    background: var(--main-dark);
    background: -webkit-linear-gradient(135deg, var(--main-dark) 0%, var(--sec-dark) 100%);
  }

  h1 {
  font-size: 3em;
  line-height: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: box-shadow 0.15s;
  }

  /* -------- COMPLETE STYLE TO COMPOSE THE LAYOUT OF A PAGE ------- */
  div#app-container {
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100vh;
  }

  header {
    display: flex;
    flex-grow: 0;
    flex-basis: auto;
  }

  main {
    flex-grow: 1;
    flex-basis: auto;
  }

  footer {
    flex-grow: 0;
    margin: 8px
  }
  /* -------- END OF COMPLETE STYLE TO COMPOSE THE LAYOUT OF A PAGE ------- */

  /* -------- COMPLETE STYLE FOR BUTTONS ------- */
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    margin: 4px 8px;
    min-width: 128px;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--sec-dark);
    color: var(--main-white);
    cursor: pointer;
    transition: border-color, box-shadow 0.25s;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: var(--normal-shadow);
    border-color: var(--main-green);
  }

  button:active {
    transform: translateY(0px);
    box-shadow: var(--small-shadow);
    outline: 4px auto -webkit-focus-ring-color;
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:focus,
  button:disabled:active {
    opacity: 0.75;
    transform: none;
    box-shadow: none;
    border-color: transparent;
    outline: none;
    cursor: not-allowed;
  }
  /* -------- END OF COMPLETE STYLE FOR BUTTONS ------- */

  /* -------- COMPLETE STYLE FOR SCROLLBAR ------- */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--main-white);
    border-radius: 0 8px 0 0;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--main-dark);
    border: 2px solid var(--main-white);
    border-radius: 8px;
  }
  /* -------- END OF COMPLETE STYLE FOR SCROLLBAR ------- */
`;