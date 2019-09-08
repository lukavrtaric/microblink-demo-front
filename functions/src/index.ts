import * as functions from 'firebase-functions';

const express = require('express');
const cors = require('cors');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors({credentials: true, origin: true}));

app.post('/recognize/execute', (proxyReq, proxyRes) => {
    const authorizationHeader = 'Bearer ' + functions.config().microblinkapi.authorizationheader;
    const microblinkEndpoint = functions.config().microblinkapi.microblinkendpoint + '/recognize/execute';

    request.post(microblinkEndpoint, {
        json: proxyReq.body,
        headers: { Authorization: authorizationHeader }
    }, (MBApiError, MBApiResponse, MBApiResult) => {
        if (MBApiError) {
            let statusCode = (MBApiError instanceof Error) ? 500 : MBApiError.statusCode;

            return proxyRes.status(statusCode).json(MBApiError);
        }

        return proxyRes.status(MBApiResponse.statusCode).json(MBApiResult);
    });
});

exports.microblinkapi = functions.https.onRequest(app);