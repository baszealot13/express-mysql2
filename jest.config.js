const config = {
    verbose: true,
    collectCoverageFrom: [
        'routes/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
}

module.exports = config;