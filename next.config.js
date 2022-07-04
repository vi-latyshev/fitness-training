const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const {
    PHASE_PRODUCTION_SERVER,
    PHASE_DEVELOPMENT_SERVER,
} = require('next/constants');

const withNextConfig = require('./next-plugins/withNextConfig');
const withCheckRequiredEnv = require('./next-plugins/withCheckRequiredEnv');
const withEnv = require('./next-plugins/withEnv');
const withInitialDBData = require('./next-plugins/withInitialDBData');

module.exports = withPlugins([
    withNextConfig,
    withCheckRequiredEnv,
    withEnv,
    withBundleAnalyzer,
    [withInitialDBData, [PHASE_PRODUCTION_SERVER, PHASE_DEVELOPMENT_SERVER]],
]);
