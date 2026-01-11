export function hasPermission(
    permissions: string[],
    required: string
  ) {
    return permissions.includes("ALL") || permissions.includes(required);
  }
  