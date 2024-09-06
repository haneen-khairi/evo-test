import { theme } from 'antd'
const lightTheme = {
    token: {
        colorPrimary: "#38ACB1",
        colorSecondary: "#fafafa",
        colorBgContainer: "#fff",
        colorSplit: "#E0E0E0",
        bodyColor: "#fefefe",
        cardColor: "#fff",
        cardHeaderColor: "#eff6ff",
        cardShadow: "0 0 0 1px rgba(0,0,0,.05)",
    },
    components: {
        Table: {
            headerBg: "#fff",
            borderColor: "#fff",
        },
        Button: {
            defaultColor: "rgba(56, 172, 177, 1)",
        },
        Select: {
            selectorBg: "#fff",
        }
    }
}
const darkTheme = {
    algorithm: theme.darkAlgorithm,

    token: {
        colorPrimary: "#38ACB1",
        colorSecondary: "#2b2a36",
        colorBgContainer: "#2b2a36",
        colorSplit: "#E0E0E0",
        bodyColor: "#1a1927",
        cardColor: "#242331",
        cardHeaderColor: "#1a1927",
        primaryTextColor: "#f7f9fa",
        secondaryTextColor: "#4f4f59",
        colorText: 'white',
        cardShadow: "0 0 0 1px rgba(255,255,255,.1)",
        colorLink: "#38ACB1",
    },
    components: {
        Table: {
            headerBg: "#1a1927",
            borderColor: "#00000000",
        },
        Button: {
            defaultColor: "rgba(56, 172, 177, 1)",
        },
        Select: {
            selectorBg: "#2b2a36",
        }
    }
}

const getCurrentTheme = () => {
    if (localStorage.getItem('theme')) {
        localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme
    } else {
        return lightTheme

    }
}
export {
    lightTheme,
    darkTheme,
    getCurrentTheme
};