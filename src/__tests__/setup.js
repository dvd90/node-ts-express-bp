global.console = {
  log: jest.fn(), // console.log are ignored in tests
  // log: console.log, // console
  // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
  error: console.error,
  // warn: console.warn,
  // error: jest.fn(),
  warn: jest.fn(),
  info: console.info,
  debug: console.debug
};
