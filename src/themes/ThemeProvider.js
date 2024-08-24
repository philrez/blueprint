import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const decorateTheme = ({ theme }) => {
  return extendTheme({
    ...theme,
    MuiCssBaseline: {
      ...theme.MuiCssBaseline,
      typography: {
        ...Object.keys(theme.typography).reduce((acc, key, index) => {
          if (index === 0) {
            acc[key] = theme.typography[key].font;
          }

          return {
            ...acc,
            [key]: {
              ...theme.typography[key],
              font: `${theme.typography[key].fontStyle}
                  ${theme.typography[key].fontWeight}
                  ${theme.typography[key].fontSize}/
                  ${theme.typography[key].lineHeight}
                  ${theme.typography[key].fontFamily}`,
              fontStyle: theme.typography[key].fontStyle,
              fontWeight: theme.typography[key].fontWeight,
              fontSize: theme.typography[key].fontSize,
              lineHeight: theme.typography[key].lineHeight,
              fontFamily: theme.typography[key].fontFamily,
              textDecorationLine: theme.typography[key].textDecorationLine,
              textTransform: theme.typography[key].textTransform,
            },
          };
        }, {}),
      },
    },
  });
};

const ThemeProvider = ({ children, theme }) => {
  const decoratedTheme = decorateTheme({ theme });
  const baselineStyles = decoratedTheme?.MuiCssBaseline?.styleOverrides;

  return (
    <CssVarsProvider theme={decoratedTheme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        {baselineStyles && <style>{baselineStyles}</style>}
        {baselineStyles && (
          <style>
            {`
          ${Object.keys(decoratedTheme.MuiCssBaseline.typography)
            .map((typographyKey) => {
              return `
              .tb-MuiCssBaseline-typography-${typographyKey}-font {
                font: var(--mui-MuiCssBaseline-typography-${typographyKey}-font);
                text-decoration-line: var(--mui-MuiCssBaseline-typography-${typographyKey}-textDecorationLine);
                text-transform: var(--mui-MuiCssBaseline-typography-${typographyKey}-textTransform);
              }
            `;
            })
            .join('\n')}
          `}
          </style>
        )}
        {baselineStyles && (
          <style>
            {`
            h1 {
              font: var(--mui-MuiCssBaseline-typography-H1-font);
              text-decoration-line: var(--mui-MuiCssBaseline-typography-H1-textDecorationLine);
              text-transform: var(--mui-MuiCssBaseline-typography-H1-textTransform);
            }
            h2 {
              font: var(--mui-MuiCssBaseline-typography-H2-font);
              text-decoration-line: var(--mui-MuiCssBaseline-typography-H2-textDecorationLine);
              text-transform: var(--mui-MuiCssBaseline-typography-H2-textTransform);
            }
            h3 {
              font: var(--mui-MuiCssBaseline-typography-H3-font);
              text-decoration-line: var(--mui-MuiCssBaseline-typography-H3-textDecorationLine);
              text-transform: var(--mui-MuiCssBaseline-typography-H3-textTransform);
            }
            h4 {
              font: var(--mui-MuiCssBaseline-typography-H4-font);
              text-decoration-line: var(--mui-MuiCssBaseline-typography-H4-textDecorationLine);
              text-transform: var(--mui-MuiCssBaseline-typography-H4-textTransform);
            }
            h5 {
              font: var(--mui-MuiCssBaseline-typography-H5-font);
              text-decoration-line: var(--mui-MuiCssBaseline-typography-H5-textDecorationLine);
              text-transform: var(--mui-MuiCssBaseline-typography-H5-textTransform);
            }
            h6 {
              font: var(--mui-MuiCssBaseline-typography-H6-font);
              text-decoration-line: var(--mui-MuiCssBaseline-typography-H6-textDecorationLine);
              text-transform: var(--mui-MuiCssBaseline-typography-H6-textTransform);
            }
            `}
          </style>
        )}
        {children}
      </StyledEngineProvider>
    </CssVarsProvider>
  );
};

export default ThemeProvider;
