const { createGlobalStyle } = require("styled-components");

export const GlobalStyleLanding = createGlobalStyle`

    :root {

        --bg-color-landing: #11081F;
        --bg-color-landing-container: #FEFEFE;

        --color-black: #000000;
        --color-blue-primary: #0E37AF; // for text
        --color-blue-secondary: #00A5E8; // for buttons
        
        // buttons
        --button-border: none;
        --button-bg-primary: #000000;
        --button-bg-secondary: #00A5E8;
        --button-radius: 15px;
        --button-font-family: 'Quicksand', sans-serif;

        // for landing page paragraphs - body
        // --text-body: calc(14px + 0.8vw); //     26px     w-1519px -> 8% is 12
        --text-body-color: #000000;
        --text-body-font: 'Quicksand', sans-serif;
        --text-body-line-height: 40px;
        // .... - titles
        // --text-title: calc(32px + 0.8vw);
        --text-title-color: #000000;
        --text-title-font: 'Poppins', sans-serif;

        // --text-subtitle: calc(14px + 0.8vw);
        --text-subtitle-color: #0E37AF;
        --text-subtitle-font: 'Poppins', sans-serif;
    }

    //override transparent color when specifying button type (tailwind)
    button, [type="button"], [type="reset"], [type="submit"] {
        background-color: #000000;
    }


    html {
        scroll-behavior: smooth;
        box-sizing: border-box;
    }

    body {
        position: relative;
        margin: 0;
        background-color: var( --bg-color-landing);
    }

    // main title
    h1 {
        font-family: var(--text-title-font);
        font-style: normal;
        font-weight: 600;
        font-size: 4.5rem; //calc(41px + 2vw); // ~72px
        letter-spacing: 0.15em;
    }

    // paragraphs titles
    h2 {
        font-family: var(--text-title-font);
        font-style: normal;
        font-weight: 500;
        font-size: 2.25rem; //calc(21px + 1vw); // 36px except "Automating creativity" calc(24px + 2vw);
        letter-spacing: 0.1em;
        margin: 0;
    }

    // paragraphs subtitles
    h3 {
        font-family: var(--text-subtitle-font);
        font-style: normal;
        font-weight: 400;
        font-size: 1.3rem;
        letter-spacing: 0.1em;
        margin: 0;
        color: var(--text-subtitle-color);
    }

    button {
        border: var(--button-border);
        font-family: var(--button-font-family);
        font-weight: 700;
        font-size: 1.3rem;
        border: var(--button-border);
        border-radius: var(--button-radius);
        text-align: center;
        cursor: pointer;
        color: white;

        :hover {
            transform: scale(1.05);
        }

    }

`;


export const GlobalStylePlatform = createGlobalStyle`

    :root {
        --bg-color-main: #FFFBF8;
        --bg-color-navbar: #021944;

        --color-blue-primary: #0E37AF; // for text
        --color-blue-secondary: #00A5E8; // for buttons
        
        // buttons
        --button-border: none;
        --button-bg-primary: #000000;
        --button-bg-secondary: #00A5E8;
        --button-radius: 12px;
        --button-font-family: 'Quicksand', sans-serif;

        --text-body-font: 'Quicksand', sans-serif;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    

    //override transparent color when specifying button type (tailwind)
    button, [type="button"], [type="reset"], [type="submit"] {

    }

    input[type=file]::file-selector-button {
        border: var(--button-border);
        font-family: var(--button-font-family);
        font-weight: 600;
        font-size: 1rem;
        border: var(--button-border);
        border-radius: var(--button-radius);
        text-align: center;
        cursor: pointer;
        color: white;
        width: 110px;
        height: 55px;
        background-color: #1b1b1b;
        cursor: pointer;

        :hover {
            background-color: #2b2a33;
        }

    }

    .navbar-icons {
        width: 28px;
        height: 28px;
        color: white;
        min-width: 26px;
        min-height: 26px;
    }

    h2 {
        font-family: 'Poppins', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 2.25rem;
        letter-spacing: 0.1em;
        margin: 0;
    }

    h3{
        font-family: 'Poppins', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 1.2rem;
        letter-spacing: 0.05em;
        margin: 0;
    }

    .account-input {
        border: 1px solid #777777;
        width: 350px;
        height: 50px;
        border-radius: 50px;
        padding: 10px 20px;
        outline: none;
        margin-top: 1vh;
    }

    .profile-input {
        width: 350px;
        float: left;
        outline: none;
    }

    button {
        font-family: var(--button-font-family);
        font-weight: 600;
        font-size: 1.2rem;
        border: var(--button-border);
        border-radius: var(--button-radius);
        text-align: center;
        cursor: pointer;
        color: white;

        :hover {
            transform: scale(1.02);
        }

    }
    

`;
