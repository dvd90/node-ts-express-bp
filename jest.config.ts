import path from 'path';
const rootDirectory = path.resolve(__dirname);

export default {
  clearMocks: true,
  // collectCoverage: true,
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  // coverageThreshold: {
  //   global: {
  //     branches: 70,
  //     function: 80,
  //     lines: 80,
  //     statements: 80
  //   }
  // },
  globals: {
    'ts-jest': {
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  rootDir: rootDirectory,
  roots: [rootDirectory],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/build'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: ['((/__tests__/.*)|(\\.|/)(test|spec))\\.tsx?$'],
  testEnvironment: 'node'
};
