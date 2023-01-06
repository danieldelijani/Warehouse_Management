class DefaultDict {
    constructor(defaultVal) {
      return new Proxy({}, {
        get: (target, name) => name in target ? target[name] : defaultVal
      })
    }
  }
  
export const createReportFromResponse = (response, context) => {
    // Process the Data
    let documents = response;
    let listOfDocuments = [];
    let dates = [];
    for (const doc of documents) {
        let operations = doc.Operations;
        for (const operation of operations) {
            listOfDocuments.push(operation);
            dates.push(operation.Date)
        }
    }

    dates = [... new Set(dates)];
    dates.sort((a, b) => {
      let aDate = new Date(a);
      let bDate = new Date(b);
      if (aDate > bDate) {
        return 1;
      }
      else if(aDate < bDate) {
        return -1
      }
      else {
        return 0;
      }
    })
    
    if (context) {
      context.log(`dates=${dates}`);
    }

    // Sort by Date
    listOfDocuments.sort((a, b) => {
        let aDate = new Date(a.Date);
        let bDate = new Date(b.Date)
        if (aDate > bDate) {
            return 1;
        }
        else if (aDate < bDate) {
            return -1;
        }
        else {
            return 0;
        }
    });

    if (context) {
      context.log(`listOfDocuments=${listOfDocuments}`);
    }
    
    // Create summary
    const summary = [];
    const inventory = new DefaultDict(0);
    for (const date of dates) {
        const dateItems = listOfDocuments.filter((operation, i) => {
            return operation.Date == date;
        });
        let itemMapping = {}
        for (const item of dateItems) {
            // update inventory
            if (item.Operation == 'Received' || item.Operation == 'Returned') {
                inventory[item.ProductID] = inventory[item.ProductID] + parseInt(item.Count);
            }
            else if (item.Operation == 'Shipped') {
                inventory[item.ProductID] = inventory[item.ProductID] - parseInt(item.Count);
            }
            else {
              continue;
            }

            if (item.ProductID in itemMapping) {
                itemMapping[item.ProductID][item.Operation] = parseInt(item.Count) + itemMapping[item.ProductID][item.Operation];
                itemMapping[item.ProductID]['OnHand'] = inventory[item.ProductID];
            }
            else {
                itemMapping[item.ProductID] = {
                    'Product': item.Product,
                    'Received': 0,
                    'Shipped': 0,
                    'Returned': 0,
                    'OnHand': inventory[item.ProductID]
                }
                itemMapping[item.ProductID][item.Operation] = parseInt(item.Count) + itemMapping[item.ProductID][item.Operation];
            }
        }
        summary.push({[date]: itemMapping})
    }
    return summary;
}

const exampleResponse = 
  [
    {
      "_id": "633e3b61bcabefcf18102299",
      "Operations": [
        {
          "Operation": "Received",
          "Product": "Haircomb",
          "ProductID": "3",
          "ShipmentID": "10",
          "Date": "January 3, 2017",
          "Count": "7",
          "_id": "633e3b61bcabefcf1810229a"
        }
      ],
      "__v": 0
    },
    {
      "_id": "633e3b68bcabefcf1810229c",
      "Operations": [
        {
          "Operation": "Shipped",
          "Product": "Haircomb",
          "ProductID": "3",
          "ShipmentID": "10",
          "Date": "January 3, 2017",
          "Count": "7",
          "_id": "633e3b68bcabefcf1810229d"
        }
      ],
      "__v": 0
    },
    {
      "_id": "633e3c8fcea7843d834089e7",
      "Operations": [
        {
          "Operation": "Received",
          "Product": "Haircomb",
          "ProductID": "3",
          "ShipmentID": "10",
          "Date": "January 3, 2017",
          "Count": "7",
          "_id": "633e3c8fcea7843d834089e8"
        }
      ],
      "__v": 0
    }
  ]

console.log(JSON.stringify(createReportFromResponse(exampleResponse, null)));