import * as functions from 'firebase-functions';
import next from 'next';
import * as path from "path";

const app = next({ dev: false, 
    conf: { distDir: `${path.relative(process.cwd(), __dirname)}/../functions/next` }})
const handle = app.getRequestHandler()

export const nextApp = functions.https.onRequest((req: any, res: any) => {
    console.log('File: ' + req.originalUrl)
    return app.prepare().then(() => handle(req, res))
})