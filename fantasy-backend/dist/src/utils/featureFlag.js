"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFeatureEnabled = void 0;
const isFeatureEnabled = (config, feature) => {
    return Boolean(config?.features?.[feature]);
};
exports.isFeatureEnabled = isFeatureEnabled;
