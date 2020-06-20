@paljs/cli
==========

Pal cli will be your friend in developing nodejs full stack projects to auto generate everything for you

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@paljs/cli.svg)](https://npmjs.org/package/@paljs/cli)
[![CircleCI](https://circleci.com/gh/paljs/prisma-tools/tree/master.svg?style=shield)](https://circleci.com/gh/paljs/prisma-tools/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/paljs/prisma-tools?branch=master&svg=true)](https://ci.appveyor.com/project/paljs/prisma-tools/branch/master)
[![Codecov](https://codecov.io/gh/paljs/prisma-tools/branch/master/graph/badge.svg)](https://codecov.io/gh/paljs/prisma-tools)
[![Downloads/week](https://img.shields.io/npm/dw/@paljs/cli.svg)](https://npmjs.org/package/@paljs/cli)
[![License](https://img.shields.io/npm/l/@paljs/cli.svg)](https://github.com/paljs/prisma-tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @paljs/cli
$ pal COMMAND
running command...
$ pal (-v|--version|version)
@paljs/cli/0.0.0 darwin-x64 node-v14.4.0
$ pal --help [COMMAND]
USAGE
  $ pal COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pal generate [FILE]`](#pal-generate-file)
* [`pal hello [FILE]`](#pal-hello-file)
* [`pal help [COMMAND]`](#pal-help-command)
* [`pal schema CONVERTER`](#pal-schema-converter)

## `pal generate [FILE]`

describe the command here

```
USAGE
  $ pal generate [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/generate.ts](https://github.com/paljs/prisma-tools/blob/v0.0.0/src/commands/generate.ts)_

## `pal hello [FILE]`

describe the command here

```
USAGE
  $ pal hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ pal hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/paljs/prisma-tools/blob/v0.0.0/src/commands/hello.ts)_

## `pal help [COMMAND]`

display help for pal

```
USAGE
  $ pal help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `pal schema CONVERTER`

Prisma schema file converter to json object or change Snack case to Camel case

```
USAGE
  $ pal schema CONVERTER

ARGUMENTS
  CONVERTER  (json|camel-case) specify what is the function you need

OPTIONS
  -h, --help                     show CLI help
  -o, --output-path=output-path  [default: prisma/] folder path for converted file
  -t, --type=(js|ts|json)        [default: ts] type of output file type when you convert to json
  -v, --version                  show CLI version
```

_See code: [src/commands/schema.ts](https://github.com/paljs/prisma-tools/blob/v0.0.0/src/commands/schema.ts)_
<!-- commandsstop -->
