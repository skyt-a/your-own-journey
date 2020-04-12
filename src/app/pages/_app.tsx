// import App from 'next/app'
import { AppProps } from 'next/app';
import { createContext, Dispatch, useReducer } from 'react';
import { reducer, StoreState, initialState } from '../reducers/reducer';
import { Global, css } from '@emotion/core';
import { Auth } from '../components/molecules/Auth';
import styled from '@emotion/styled';
import '../styles/style.scss';

export const StoreContext = createContext<StoreState>(null as any);
export const DispatchContext = createContext<Dispatch<any>>(null as any);

const App = (props: AppProps): any => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
            }
            body {
              font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans',
                Meiryo, sans-serif;
            }
          `}
        />
        <Main>
          <Auth {...props} />
        </Main>
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};

const Main = styled.main`
  max-width: 500px;
  min-height: 100vh;
  padding: 8px;
  margin: auto;
  background-color: #fff;
`;

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
