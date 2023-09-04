const path = require("path");

const buildEslintCommand = (filenames) => {
	return `next lint --fix --max-warnings 0 --file  ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(" --file ")}`;
};

module.exports = {
	"*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
