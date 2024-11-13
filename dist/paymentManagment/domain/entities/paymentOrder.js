"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentOrder = void 0;
class PaymentOrder {
    constructor(id, status, links) {
        var _a, _b;
        this.id = id;
        this.status = status;
        this.createdAt = new Date();
        this.approveLink = (_a = links.find((link) => link.rel === 'approve')) === null || _a === void 0 ? void 0 : _a.href;
        this.captureLink = (_b = links.find((link) => link.rel === 'capture')) === null || _b === void 0 ? void 0 : _b.href;
    }
    getId() {
        return this.id;
    }
    getStatus() {
        return this.status;
    }
    getApproveLink() {
        return this.approveLink;
    }
    getCaptureLink() {
        return this.captureLink;
    }
    updateStatus(newStatus) {
        this.status = newStatus;
    }
}
exports.PaymentOrder = PaymentOrder;
