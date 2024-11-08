module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: ["html", "text", "lcov"],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};
