import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    /*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}

/*
  2. Remove default margin
*/
* {
  margin: 0;
}

/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
  font-family: "Asap", sans-serif;
}

/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}

/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

///////////////////////////////////////////////////////////////////

body {
    color: var(--color-text);
    background-color: var(--color-background);
}

/* custom animation */
@keyframes hoverJoy {
  from {
    transform: translateY(-2px);
  }
  to {
    transform: translateY(-3px);
  }
}

@keyframes bounceBack {
  30% {
    transform: translateY(1px);
  }
  60% {
    transform: translateY(0px);
  }
  80% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(-1px);
  }
}

@keyframes curtainDown {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 100%;
      opacity: 1;
    }
  }

@keyframes curtainUp {
  0% {
    max-height: 100%;
  }
  50% {
    max-height: 50%;
    padding: 2px 4px;
  }
  99% {
    padding: 0px 4px;
  }
  100% {
    max-height: 0;
    padding: 0;
  }
}

@keyframes showUp {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

@keyframes showOff {
  from {
    opacity: 1;
  }
  to {
    opacity: 0; 
  }
}

@keyframes switchOn {
  0% {
    transform: translateX(80%);
  } 
  80% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes switchOff {
  0% {
    transform: translateX(-80%);
  } 
  80% {
    transform: translateX(5%);
  }
  100% {
    transform: translateX(0);
  }
}


/* CSS variables */
:root {
    //color
    --color-text: hsl(0deg 0% 0%);
    --color-background: hsl(0deg 0% 97%);
    --color-outline: hsl(350deg 75% 55%);
    --color-button: hsl(240deg 50% 50%);
    --color-button-back: hsl(240deg 30% 30%);
    --color-button-hover: hsl(240deg 70% 70%);
    --color-button-hover-darker: hsl(240deg 60% 60%);
    --color-button-border: hsl(280deg 100% 50%);
    --color-button-border-darker: hsl(280deg 100% 30%);
    --color-sunny-tangerine: hsl(30deg 70% 50%);
    --color-mystic-lavender: hsl(150deg 70% 50%);
    --color-cosmic-ocean-blue: hsl(270deg 70% 50%);

    //color of gray
    --color-gray-light: hsl(0deg 0% 70%);
    --color-gray-medium: hsl(0deg 0% 50%);
    --color-gray-dark: hsl(0deg 0% 30%);
    --color-gray-darker: hsl(0deg 0% 10%);
    //drop-shadow
    --drop-shadow-base: drop-shadow(2px 4px 8px hsl(0deg 0% 0% / 0.3));

    //
    --animation-hover-joy: hoverJoy;
    --animation-bounce-back: bounceBack;
    --animation-curtain-down: curtainDown;
    --animation-curtain-up: curtainUp;
    --animation-show-up: showUp;
    --animation-show-off: showOff;
    --animation-switch-on: switchOn;
    --animation-switch-off: switchOff;
}
`;

export default GlobalStyles;
