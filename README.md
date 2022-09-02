# q-core

## Add to project

**Add npm/yarn scripts:**

```json
// package.json
{
    "preinstall": "yarn q:init",
    "q:init": "test -d ./q-core/lib && exit 0 || git submodule init && yarn q:build",
    "q:update": "git submodule update && yarn q:build",
    "q:upgrade": "cd q-core && git checkout main && git pull && cd .. && yarn q:build",
    "q:build": "cd q-core && yarn install && yarn build && cd ..",
}
```

**Add q-core as a git submodule:**

`git submodule add https://github.com/authentiqagency/q-core.git`

This will fetch the submodule, install its dependencies and build the library:

`yarn q:init`

**Add q-core as a local file dependency:**

`yarn add ./q-core`

**Add q-core to eslint ignore pattern:**

q-core comes with its own eslint config, therefore can be added to the ignore pattern of your project. Do not add it to .eslintignore, as linting won't work for q-core anymore.

```json
// .eslintrc
{
    // ...
    "ignorePatterns": ["q-core"]
}
```

## Update to current version and rebuild

`yarn q:update`

## Upgrade to latest version and rebuild

`yarn q:upgrade`
