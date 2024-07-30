# Install WorkOS CLI Github Action

Adds [WorkOS CLI](https://github.com/workos/workos-cli) to your Github Workflow

## Example usage

Include this Action as a step in your workflow:

```
uses: workos/cli-action@v1
```

## Configuration

You'll need to provide a version with the `Install CLI` step. 

Using the CLI requires a WorkOS API key. You can provide this key as an environment variable in your workflow file:

```yaml
name: Example action

on: [push]

jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - name: Install CLI
        uses: workos/cli-action@v1
      - name: Do something with the CLI
        run: workos --version
        env:
          WORKOS_ACTIVE_ENVIRONMENT: headless
          WORKOS_ENVIRONMENTS_HEADLESS_ENDPOINT: <MY_ENDPOINT>
          WORKOS_ENVIRONMENTS_HEADLESS_API_KEY: ${{ secrets.WORKOS_ENVIRONMENTS_HEADLESS_API_KEY }}
```