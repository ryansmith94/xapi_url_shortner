# xAPI URL Shortener
> A installable URL shortening web service that is [xAPI](https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md) ([Tin Can API](http://tincanapi.com/)) enabled for analytics.

[![Build Status](https://travis-ci.org/ryansmith94/xapi_url_shortner.svg?branch=master)](https://travis-ci.org/ryansmith94/xapi_url_shortner)
[![License](https://img.shields.io/badge/License-GPLv3-brightgreen.svg)](http://opensource.org/licenses/GPL-3.0)

## Requirements
- Node
- Git
- MySQL

## Installation
Run the following in your terminal (make sure you have the [requirements](#requirements) first).
```
git clone git@github.com:ryansmith94/xapi_url_shortner.git shortener; cd shortener; npm install --production; npm link
```

## Configuration
1. Create a copy of the ".env" file called ".local.env".
1. Change the environment variables in ".local.env" for your environment.

## Upgrading
Run the following in your terminal.
```
git pull; npm install --production; npm link
```

## Usage
- To host the web service, run `NODE_ENV=local node dist/server.js`.
- To administrate the web service, run `xus -h` to see which commands are available.
- To track links with your own context, first host the web service, then use "example/index.html" as an example of how to create pages with short links on.