/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const dotenv = require("dotenv");
const path = require("path");

const projectDir = __dirname;

// 加载工作区根目录的环境变量
const env = dotenv.config({path: path.join(projectDir, '.env')}).parsed;

console.log({env})

/** @type {import('next').NextConfig} */
const nextConfig = {

    env,

    reactStrictMode: true, swcMinify: true,

    // ref: https://nextjs.org/docs/api-reference/next/image#remote-patterns
    images: {
        remotePatterns: [// ref:https://stackoverflow.com/a/73951135/9422455
            // 注意，port也要加，否则不可以访问其他端口，比如后端的
            {protocol: "http", hostname: "**"}, {protocol: "https", hostname: "**"},]
    },

    // using bson, ref: https://stackoverflow.com/a/68339259/9422455
    webpack: (config) => {
        // this will override the experiments
        config.experiments = {...config.experiments, topLevelAwait: true};
        // this will just update topLevelAwait property of config.experiments
        // config.experiments.topLevelAwait = true
        return config;
    },
}

module.exports = nextConfig
