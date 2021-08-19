// module.exports = {
//   testPathIgnorePatterns: ["/node_modules/", "/.next/"],
//   setupFilesAfterEnv: [
//     "<rootDir>/src/tests/setupTests.ts"
//   ],
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
//   },
//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     "\\.(scss|css|sass)$": "identity-obj-proxy"
//   },
//   collectCoverage: true,
//   collectCoverageFrom: [
//     "src/**/*.tsx",
//     "!src/**/*.spec.tsx",
//     "!src/**/_app.tsx",
//     "!src/**/_document.tsx",
//   ],
//   coverageReporters: ["lcov", "json"]
// };



module.exports = {

  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
};