const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const withNextConfig = require('./next-plugins/withNextConfig');
const withCheckRequiredEnv = require('./next-plugins/withCheckRequiredEnv');
const withEnv = require('./next-plugins/withEnv');

module.exports = withPlugins([
    withNextConfig,
    withCheckRequiredEnv,
    withEnv,
    withBundleAnalyzer,
]);
