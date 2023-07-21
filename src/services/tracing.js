const { HoneycombSDK } = require('@honeycombio/opentelemetry-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
require('dotenv').config();

const sdk = new HoneycombSDK({
    apiKey: process.env.HONEYCOMB_API_KEY,
    serviceName: process.env.OTEL_SERVICE_NAME,
    instrumentations: [getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': {
        enabled: false,
        },
    })],
});

sdk.start()
