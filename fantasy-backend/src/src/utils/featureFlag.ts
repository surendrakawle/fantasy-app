export const isFeatureEnabled = (
    config: any,
    feature: keyof typeof config.features
  ) => {
    return Boolean(config?.features?.[feature]);
  };
  