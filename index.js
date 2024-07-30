const core = require('@actions/core');
const tc = require('@actions/tool-cache');

run().catch(error => {
    core.setFailed(error.message);
})

async function run() {
    const version = core.getInput('version');
    const downloadUrlWithVersion = getURLForVersion(version);
    const cliArch = getCliArch()

    switch (process.platform) {
        case "win32": {
            const url = `${downloadUrlWithVersion}/workos_cli_Windows_${cliArch}.zip`;
            await installZip(url);
            break;
        }
        case "linux":
        case "darwin": {
            const url = `${downloadUrlWithVersion}/workos_cli_${process.platform}_${cliArch}.tar.gz`;
            await installTarball(url);
            break;
        }
        default: {
            throw new Error(`Unsupported platform '${process.platform}'`);
        }
    }
}

function getURLForVersion(version) {
    if (version === 'latest') {
        return `https://github.com/workos/workos-cli/releases/${version}/download`
    } else {
        return `https://github.com/workos/workos-cli/releases/download/${version}`
    }
}

function getCliArch() {
    switch (process.arch) {
        case "arm64":
            return "arm64";
        case "x64":
            return "x86_64";
        default:
            throw new Error(`Unsupported architecture '${process.arch}'`);
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
