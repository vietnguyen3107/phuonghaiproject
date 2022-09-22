"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatumController = void 0;
const common_1 = require("@nestjs/common");
const datum_service_1 = require("./datum.service");
const datum_entity_1 = require("./datum.entity");
const lab_entity_1 = require("../lab/lab.entity");
const fs_1 = require("fs");
const path_1 = require("path");
const basic_auth_middleware_1 = require("../user/basic.auth.middleware");
let DatumController = class DatumController {
    constructor(datumService) {
        this.datumService = datumService;
    }
    filter(sensorType, deviceSerialNumber) {
        return this.datumService.getDatumLastHour(sensorType, deviceSerialNumber);
    }
    filter1(sensorType, deviceSerialNumber) {
        return this.datumService.getDatumLast24Hours(sensorType, deviceSerialNumber);
    }
    filter2(sensorType, deviceSerialNumber) {
        return this.datumService.getDatumLast7Days(sensorType, deviceSerialNumber);
    }
    filter3(sensorType, deviceSerialNumber) {
        return this.datumService.getDatumLast30Days(sensorType, deviceSerialNumber);
    }
    async filter4(startDate, endDate) {
        const data = await this.datumService.getStatisticData(startDate, endDate);
        if (data === null)
            return [];
        else
            return data;
    }
    filter7(deviceSerialNumber, startDate, endDate) {
        return this.datumService.getStatisticDataByDevice(deviceSerialNumber, startDate, endDate);
    }
    filter5(deviceSerialNumber) {
        return this.datumService.getLastestDataByDevice(deviceSerialNumber);
    }
    filter5a(req) {
        return this.datumService.getLastestDataByAllDevices2(req.user.Id);
    }
    async filter8(deviceSerialNumber, startDate, endDate) {
        const data = await this.datumService.getStatisticDataBySensor(deviceSerialNumber, startDate, endDate);
        if (data === null) {
            return [];
        }
        else
            return data;
    }
    getFile() {
        const file = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), 'out.csv'));
        return new common_1.StreamableFile(file);
    }
    async filter9(deviceSerialNumber, startDate, endDate) {
        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const fileName = `DataFile_` + new Date() + '.csv';
        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: "Date", title: "Date" },
                { id: "DeviceSerialNumber", title: "DeviceSerialNumber" },
                { id: "SensorType", title: "SensorType" },
                { id: "Value", title: "Value" },
                { id: "Unit", title: "Unit" },
                { id: "Status", title: "Status" }
            ]
        });
        let rawData = await this.datumService.getDataByDate(deviceSerialNumber, startDate, endDate);
        try {
            csvWriter
                .writeRecords(rawData)
                .then(() => console.log('The CSV file was written successfully'));
            const file = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), fileName));
            return new common_1.StreamableFile(file);
        }
        catch (e) {
            console.log(e);
        }
        return null;
    }
    findAll() {
        return this.datumService.findAll();
    }
    get(params) {
        return this.datumService.findOne(params.Id);
    }
    create(datum, req) {
        datum.CreatedBy = req.user.Email;
        datum.CreatedDate = new Date();
        console.log(datum);
        return this.datumService.create(datum);
    }
    async createBatch(datums) {
        var e_1, _a;
        const successfulDatums = [];
        try {
            for (var datums_1 = __asyncValues(datums), datums_1_1; datums_1_1 = await datums_1.next(), !datums_1_1.done;) {
                const d = datums_1_1.value;
                try {
                    let result = await this.datumService.create(d);
                    if (result.hasOwnProperty('ReceivedDate')) {
                        successfulDatums.push(d);
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (datums_1_1 && !datums_1_1.done && (_a = datums_1.return)) await _a.call(datums_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return successfulDatums;
    }
    update(datum) {
        return this.datumService.update(datum);
    }
    deleteUser(params) {
        return this.datumService.delete(params.Id);
    }
};
__decorate([
    (0, common_1.Get)('/LastHour?'),
    __param(0, (0, common_1.Query)('SensorType')),
    __param(1, (0, common_1.Query)('DeviceSerialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter", null);
__decorate([
    (0, common_1.Get)('/Last24Hours?'),
    __param(0, (0, common_1.Query)('SensorType')),
    __param(1, (0, common_1.Query)('DeviceSerialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter1", null);
__decorate([
    (0, common_1.Get)('/Last7Days?'),
    __param(0, (0, common_1.Query)('SensorType')),
    __param(1, (0, common_1.Query)('DeviceSerialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter2", null);
__decorate([
    (0, common_1.Get)('/Last30Days?'),
    __param(0, (0, common_1.Query)('SensorType')),
    __param(1, (0, common_1.Query)('DeviceSerialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter3", null);
__decorate([
    (0, common_1.Get)('/StatisticData?'),
    __param(0, (0, common_1.Query)('StartDate')),
    __param(1, (0, common_1.Query)('EndDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter4", null);
__decorate([
    (0, common_1.Get)('/StatisticDataByDevice?'),
    __param(0, (0, common_1.Query)('DeviceSerialNumber')),
    __param(1, (0, common_1.Query)('StartDate')),
    __param(2, (0, common_1.Query)('EndDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter7", null);
__decorate([
    (0, common_1.Get)('/LastestDataByDevice?'),
    __param(0, (0, common_1.Query)('DeviceSerialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter5", null);
__decorate([
    (0, common_1.Get)('/LastestDataByAllDevices?'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter5a", null);
__decorate([
    (0, common_1.Get)('/StatisticDataBySensor?'),
    __param(0, (0, common_1.Query)('DeviceSerialNumber')),
    __param(1, (0, common_1.Query)('StartDate')),
    __param(2, (0, common_1.Query)('EndDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter8", null);
__decorate([
    (0, common_1.Get)('/DownloadData1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", common_1.StreamableFile)
], DatumController.prototype, "getFile", null);
__decorate([
    (0, common_1.Get)('/DataByDate?'),
    __param(0, (0, common_1.Query)('DeviceSerialNumber')),
    __param(1, (0, common_1.Query)('StartDate')),
    __param(2, (0, common_1.Query)('EndDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "filter9", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DatumController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [datum_entity_1.Datum, Object]),
    __metadata("design:returntype", void 0)
], DatumController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/Batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DatumController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [datum_entity_1.Datum]),
    __metadata("design:returntype", void 0)
], DatumController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DatumController.prototype, "deleteUser", null);
DatumController = __decorate([
    (0, common_1.Controller)('Datums'),
    __metadata("design:paramtypes", [datum_service_1.DatumService])
], DatumController);
exports.DatumController = DatumController;
//# sourceMappingURL=datum.controller.js.map