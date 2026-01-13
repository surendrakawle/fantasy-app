"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMasterConfig = void 0;
const mapMasterConfig = (doc) => ({
    websiteName: doc.websiteName,
    websiteUrl: doc.websiteUrl,
    support: doc.support,
    depositSupport: doc.depositSupport,
    withdrawalSupport: doc.withdrawalSupport,
    socialLinks: doc.socialLinks,
    features: doc.features,
    maintenance: doc.maintenance
});
exports.mapMasterConfig = mapMasterConfig;
