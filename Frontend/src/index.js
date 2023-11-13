import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { StyledEngineProvider } from '@mui/material/styles';
import { LicenseInfo } from '@mui/x-license-pro';
LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',); 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
   <StyledEngineProvider injectFirst>
        <GlobalStyles>
            <App />
        </GlobalStyles>,
   </StyledEngineProvider>
    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
