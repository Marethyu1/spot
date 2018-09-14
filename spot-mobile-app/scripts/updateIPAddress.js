const fs = require("fs")
const path = require("path")
const util = require("util")
const exec = util.promisify(require('child_process').exec);

// const child = spawn('ipconfig', ['getifaddr', 'en0']);

const file = path.join(__dirname, "../app/config/ipaddress.js")

async function main() {
    const { stdout, stderr } = await exec('ipconfig getifaddr en0');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
    const output = `export default "${stdout.trim()}"`
    fs.writeFileSync(file, output)
    console.log("Updated ip address to", stdout)
}

main()

