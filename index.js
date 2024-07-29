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
        case "linux":
        case "darwin": {
            const arch = process.arch === "arm64" ? "arm64" : "x86_64";
            const url = `https://github.com/workos/workos-cli/releases/latest/download/workos_cli_${process.platform}_${arch}.tar.gz`;
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
    core.addPath(pathToCLI + "/bin");
}

async function installTarball(url) {
    const downloadPath = await tc.downloadTool(url);
    const pathToCLI = await tc.extractTar(downloadPath);
    core.addPath(pathToCLI + "/bin");
}
