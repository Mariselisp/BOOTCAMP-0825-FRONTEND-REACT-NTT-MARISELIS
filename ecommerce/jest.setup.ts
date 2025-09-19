import "@testing-library/jest-dom";

// @ts-ignore para evitar conflicto de tipos
// y asegurar compatibilidad con Jest/jsdom
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextEncoder = require("util").TextEncoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextDecoder = require("util").TextDecoder;
