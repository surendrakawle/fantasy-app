export const mapUser = (user: any) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: {
    name: user.role?.name,
    permissions: user.role?.permissions || []
  },
  isBlocked: user.isBlocked,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt,
  profileImageUrl: user.profileImageUrl
});
