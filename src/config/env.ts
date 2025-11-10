import ApiError from "@libs/response/error";

const required = (key: string): string => {
    const val = process.env[key];
    
    if (!val) throw new ApiError(`Missing environment variable: ${key}`, 500);

    return val;
};

export const env = {
    APP_PORT: Number(Bun.env.APP_PORT || 3000),
    NODE_ENV: Bun.env.NODE_ENV || 'development',

    JWT_ACCESS_SECRET: required('JWT_ACCESS_SECRET'),
    JWT_REFRESH_SECRET: required('JWT_REFRESH_SECRET'),

    DATABASE_URL: required('DATABASE_URL'),

    EMAIL_SMTP_HOST: required('EMAIL_SMTP_HOST'),
    EMAIL_SMTP_PORT: required('EMAIL_SMTP_PORT'),
    EMAIL_SMTP_USER: required('EMAIL_SMTP_USER'),
    EMAIL_SMTP_PASS: required('EMAIL_SMTP_PASS'),
    EMAIL_SMTP_FROM: required('EMAIL_SMTP_FROM'),
    EMAIL_SMTP_SECURE: Bun.env.EMAIL_SMTP_SECURE || true
};
