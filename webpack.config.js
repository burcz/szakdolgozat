const webpack = require('webpack');

module.exports = (env) => {
	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {});

	return {
		mode: "development",

		entry: {
			index: "./src/frontend/pages/index.tsx",
		},

		output: {
			filename: "[name].bundle.js",
			chunkFilename: '[name].chunk.js',
			path: __dirname + "/dist/views",
			publicPath: "/assets/"
		},

		// Enable sourcemaps for debugging webpack's output.
		devtool: "source-map",

		resolve: {
			// Add '.ts' and '.tsx' as resolvable extensions.
			extensions: [".ts", ".tsx", ".js"]
		},

		module: {
			rules: [
				// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
				},

				// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
				{enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
				{
					test: /\.css$/,
					use: [{loader: "style-loader"}, {loader: "css-loader"}]
				},
			]
		},

		optimization: {
			splitChunks: {
				chunks: "all"
			},
			usedExports: true
		},
		plugins: [
			// add the plugin to your plugins array
			new webpack.DefinePlugin(envKeys)
		]
	};
};