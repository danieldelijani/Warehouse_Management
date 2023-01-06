import { AzureFunction, Context } from "@azure/functions"
import * as db from "../lib/azure-cosmosdb-mongodb";

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    let jsonObject = JSON.parse(myBlob.toString())
    await db.init();
    await db.addItem(jsonObject);
};

export default blobTrigger;
