const windowSize = {
    small: 'screen and (max-width: "600px")',
    base: 'screen and (max-width: "768px")',
    large: 'screen and (max-width: "1024px")',
};

const fontSize = {
    xs: '0.5rem',
    sm: '0.75rem',
    base: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
};

const lightMode = {
    main: '#685c53',
    gra: '#8d7358',
    point: '#ff6D24',
    border: '#dbdbdb',
    mainFont: '#0f0f0f',
    subFont: '#999999',
    bgSecondary: '#ecebeb',
};

const repo = {
    open: 'red',
    close: 'blue',
};

const theme = {
    windowSize,
    repo,
    fontSize,
    ...lightMode,
};

export default theme;
