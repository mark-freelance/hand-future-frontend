export const BACKEND_ENDPOINT =
  process.env.NEXT_PUBLIC_BACKEND_ENDPOINT ?? "https://api.cs-magic.cn"

console.log({ BACKEND_ENDPOINT })

export const EMAIL_SERVER = process.env.EMAIL_SERVER
export const EMAIL_FROM = process.env.EMAIL_FROM
