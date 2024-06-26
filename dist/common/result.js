"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResult = void 0;
function createResult(value, error) {
    return {
        value,
        error,
        isError: function () {
            return !!this.error;
        }
    };
}
exports.createResult = createResult;
