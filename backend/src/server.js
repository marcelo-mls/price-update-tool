const app = require('./app');

const colors = {
	green: '\x1b[32m',
	cyan: '\x1b[36m',
	red: '\x1b[31m',
	reset: '\x1b[0m'
};

const PORT = 3001;

app.listen(PORT, async () => {
	console.info(
		`\nBackend server running on port ${colors.green}${PORT}${colors.reset}`,
		`\n➜  Local: ${colors.cyan}http://localhost:${PORT}/${colors.reset}`
	);
});
