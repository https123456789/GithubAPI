# GitHub API (Not Really)

A rate limitless mirror of the GitHub API that can be used during development of projects.

## How To Use:

Make a request to a public server instance with a path prefix of `/github`.

### For example:

Normal Github API: `/repos/https123456789/GithubAPI`

GithubAPI: `/github/repos/https123456789/GithubAPI`

## Making your own instance:

### For Linux/MacOS

Run `run.sh`:
```console
chmod +x run.sh
./run.sh
```

### For Windows

```console
run.bat
```

## Public Instances:
- [https://githubapi.https123456789.repl.co](<https://githubapi.https123456789.repl.co>)