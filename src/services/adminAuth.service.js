import api from "./api";
import { ADMIN_AUTH_ROUTES } from "./adminAuth.routes";

export const adminLogin = (payload) =>
  api.post(ADMIN_AUTH_ROUTES.LOGIN, payload);

export const setup2FA = () =>
  api.post(ADMIN_AUTH_ROUTES.TWO_FA_SETUP, {});

export const verify2FASetup = (otp) =>
  api.post(ADMIN_AUTH_ROUTES.TWO_FA_VERIFY_SETUP, { otp });

export const verify2FALogin = (payload) =>
  api.post(ADMIN_AUTH_ROUTES.TWO_FA_VERIFY_LOGIN, payload);
