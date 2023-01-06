import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../lib/azure-cosmosdb-mongodb";
import {createReportFromResponse} from "../lib/create-report";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try {
        await db.init();
        const dbQuery = req?.query?.dbQuery || (req?.body && req?.body?.dbQuery);
        let items = await db.findItems(dbQuery);
        context.log(`items=${items}`);
        let report = createReportFromResponse(items, context);
        context.log(`report=${JSON.stringify(report)}`);
        let response = {
        documentResponse: report
        };
        context.res = {
            body: response,
        };

    } catch (err) {
        context.log(`*** Error throw: ${JSON.stringify(err)}`);

        context.res = {
            status: 500,
            body: err,
        };
    }

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: responseMessage
    // };
};

export default httpTrigger;