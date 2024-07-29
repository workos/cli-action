const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const io = require('@actions/io');

const workspace = process.env.GITHUB_WORKSPACE;
const binDir = `${workspace}/bin`;

run().catch(error => {
    core.setFailed(error.message);
})

async function run() {
    switch (process.platform) {
        case "win32": {
            const url = 'https://github.com/workos/workos-cli/releases/download/v0.2.0/workos_cli_Windows_x86_64.zip';
            await installZip(binDir, url);
            break;
        }
        case "linux": {
            const url = 'https://github.com/workos/workos-cli/releases/download/v0.2.0/workos_cli_Linux_x86_64.tar.gz';
            await installTarball(binDir, url);
            break;
        }
        case "darwin": {
            const url = 'https://github.com/workos/workos-cli/releases/download/v0.2.0/workos_cli_Darwin_x86_64.tar.gz';
            await installTarball(binDir, url);
            break;
        }
        default: {
            throw new Error(`Unsupported platform '${process.platform}'`);
        }
    }
}

async function installZip(path, url) {
    await io.mkdirP(path);
    const downloadPath = await tc.downloadTool(url);
    await tc.extractZip(downloadPath, path);
    core.addPath(path);
}

async function installTarball(path, url) {
    await io.mkdirP(path);
    const downloadPath = await tc.downloadTool(url);
    await tc.extractTar(downloadPath, path);
    core.addPath(path);
}
