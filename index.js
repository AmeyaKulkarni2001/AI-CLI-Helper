#!/usr/bin/env node

/**
 * ai-helper
 * Uses AI to give answer to solutions
 *
 * @author Ameya Kulkarni <https://github.com/AmeyaKulkarni2001>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const readline = require('readline');
const dotenv = require('dotenv');
dotenv.config({path: '/home/ameya/Coding/ai-helper/.env'});
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.KEY
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
const exec = async data => {
	try {
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `${data}`,
			temperature: 0,
			max_tokens: 60,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0
		});
		console.log(response.data.choices[0].text);
	} catch (error) {
		console.log(error[data]);
	}
};

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	input.includes(`test`) && console.log(process.env.KEY);
	input.includes(`exec`) &&
		rl.question('What is the question you want to ask?', async ans => {
			await exec(ans);
			process.exit(0)
		});
	debug && log(flags);
})();
