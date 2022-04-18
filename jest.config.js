module.exports = {
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ["/node_modules/", "/.next/", "<rootDir>/cypress/"],
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**/**/*.(test|spec).ts(x)"],
    setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
    moduleNameMapper: {
        "\\.(scss|css|sass)$": "identity-obj-proxy"
    },
    testMatch: ["<rootDir>/src/**/**/*.(test|spec).ts(x)"],
}
