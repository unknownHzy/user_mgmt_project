'use strict';

const chai = require('chai');
const fs = require('fs');
const Module = require('module');
const path = require('path');
const Buffer = require('buffer/').Buffer;
const Promise = require('bluebird');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (...args) {
    if (args[0].lastIndexOf('raw!', 0) === 0) {
        const requirePathRaw = args[0].split('!')[1];
        return fs.readFileSync(getFullPath(requirePathRaw, this.id), 'utf-8');
    } else if (args[0].lastIndexOf('base64!', 0) === 0) {
        const requirePathBase64 = args[0].split('!')[1];
        return fs.readFileSync(getFullPath(requirePathBase64, this.id), 'base64');
    }
    return originalRequire.apply(this, args);
};

process.on('unhandledRejection', (reason) => {
    process.stdout.write('> UnhandledRejection');
    process.stdout.write(reason);
    // process.exit(1); //eslint-disable-line no-process-exit
    process.exitCode(1);
});

const getFullPath = (rpath, calledFrom) => {
    let resolvedPath;

    try {
        resolvedPath = require.resolve(rpath);
    } catch (e) {} //eslint-disable-line no-empty

    const isExternal = /[/\\]node_modules[/\\]/.test(resolvedPath);
    const isSystemModule = resolvedPath === rpath;
    if (isExternal || isSystemModule) return resolvedPath;

    const isLocalModule = /^\.{1,2}[/\\]/.test(rpath);
    if (!isLocalModule) return rpath;

    const localModuleName = path.join(path.dirname(calledFrom), rpath);

    return Module._resolveFilename(localModuleName);
};

// Polyfills
global.window = {
    location: {}
};

// Replace Node Buffer with Web Buffer
global.Buffer = Buffer;

// Replace standard Promise with Bluebird Promise
global.Promise = Promise;

// PDL mock
// require(path.join(__dirname, 'dist/pdlLazyMock.bundle.js'));

// Load Chai assertions
global.chai = chai;
global.expect = chai.expect;
global.assert = chai.assert;

// Load Sinon
global.sinon = require('sinon');

// Initialize Chai plugins
chai.use(require('sinon-chai'));

// Disable logs
process.env.ENABLE_LOGS = false;
