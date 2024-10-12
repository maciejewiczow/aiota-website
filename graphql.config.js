module.exports = {
    schema: 'http://localhost:8000/index.php?graphql',
    documents: [
        './frontend/**/*.{ts,tsx}',
        '!(**/node_modules/**/*)',
    ],
};
