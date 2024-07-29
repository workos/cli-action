const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const io = require('@actions/io');

run().catch(error => {
    core.setFailed(error.message);
})

async function run() {
    switch (process.platform) {
        case "win32": {
            const url = `https://github.com/workos/workos-cli/releases/latest/download/workos_cli_Windows_x86_64.zip`;
            await installZip(url);
            break;
        }
        case "linux": {
            const url = `https://github.com/workos/workos-cli/releases/latest/download/workos_cli_Linux_x86_64.tar.gz`;
            await installTarball(url);
            break;
        }
        case "darwin": {
            const url = `https://github.com/workos/workos-cli/releases/latest/download/workos_cli_Darwin_x86_64.tar.gz`;
            await installTarball(url);
            break;
        }
        default: {
            throw new Error(`Unsupported platform '${process.platform}'`);
        }
    }
}

async function installZip(url) {
    const downloadPath = await tc.downloadTool(url);
    const pathToCLI = await tc.extractZip(downloadPath);
    core.addPath(pathToCLI);
}

async function installTarball(url) {
    const downloadPath = await tc.downloadTool(url);
    const pathToCLI = await tc.extractTar(downloadPath);
    console.log(pathToCLI);
    core.addPath(pathToCLI);
}
