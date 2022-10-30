const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://home-kitchen.vercel.app';

export const AWS_ENDPOINT = 'https://4i4dbs6gsf.execute-api.us-east-1.amazonaws.com/Default';