export const LoadingKeys = {
    LOGIN: "login",
    PROFILE: "profile",
    LOGOUT: "logout",

    DRIVERS: "drivers",
    DRIVER_DETAIL: "driverDetail",
    DRIVER_CREATE: "driverCreate",
    DRIVER_UPDATE: "driverUpdate",
} as const;

export type LoadingKey =
    typeof LoadingKeys[keyof typeof LoadingKeys];