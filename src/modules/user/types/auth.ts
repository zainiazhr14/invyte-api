import { t, Static } from 'elysia'

export const SignUpReq = t.Object({
  email: t.String({
    format: 'email'
  }),
  full_name: t.String(),
  phone: t.String({
    minLength: 6,
    maxLength: 15
  }),
  password: t.String({
    minLength: 1,
  })
})

export type SignUpReq = Static<typeof SignUpReq>;


export const SignInReq = t.Object({
  email: t.String({
    format: 'email'
  }),
  password: t.String({
    minLength: 1,
  })
})

export type SignInReq = Static<typeof SignInReq>;

export const VerifyOTPReq = t.Object({
  token: t.String(),
  code: t.String({
    minLength: 6,
    maxLength: 6
  })
})

export type VerifyOTPReq = Static<typeof VerifyOTPReq>;
