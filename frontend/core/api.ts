export enum AuthRoutes {
  IS_LOGGED_IN = '/auth/is-logged-in',
  ME = '/auth/me',
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  LOGOUT = '/auth/logout',
  IS_USERNAME_BUSY = '/auth/is-username-busy',
  IS_EMAIL_BUSY = '/auth/is-email-busy',
  RESTORE_PASSWORD_ALLOWED = '/auth/is-restore-password-allowed',
  RESTORE_PASSWORD = '/auth/restore-password'
}

export enum AccountRoutes {
  CONFIRM_ACCOUNT = '/confirmation-token/confirm'
}
