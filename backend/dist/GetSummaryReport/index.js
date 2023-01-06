"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../lib/azure-cosmosdb-mongodb");
const create_report_1 = require("../lib/create-report");
const httpTrigger = function (context, req) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        context.log('HTTP trigger function processed a request.');
        try {
            yield db.init();
            const dbQuery = ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.dbQuery) || ((req === null || req === void 0 ? void 0 : req.body) && ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.dbQuery));
            let items = yield db.findItems(dbQuery);
            context.log(`items=${items}`);
            let report = (0, create_report_1.createReportFromResponse)(items, context);
            context.log(`report=${JSON.stringify(report)}`);
            let response = {
                documentResponse: report
            };
            context.res = {
                body: response,
            };
        }
        catch (err) {
            context.log(`*** Error throw: ${JSON.stringify(err)}`);
            context.res = {
                status: 500,
                body: err,
            };
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map