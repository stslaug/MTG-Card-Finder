import {parse} from "url";

import next from "next";

import {createServer} from "http";

// The 'dev' flag indicates whether to run in development mode.
// On hosting platforms, process.env.NODE_ENV is usually 'production'.
const dev = process.env.NODE_ENV !== 'production';

// Initialize the Next.js app.
// We don't specify hostname and port here as they will be handled by the hosting environment.
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer(async (req, res) => {
            try {
                // Be sure to pass `true` as the second argument to url.parse.
                // This tells it to parse the query portion of the URL.
                const parsedUrl = parse(req.url, true);
                const { pathname, query } = parsedUrl;

                // Custom routing logic
                if (pathname === '/a') {
                    await app.render(req, res, '/a', query);
                } else if (pathname === '/b') {
                    await app.render(req, res, '/b', query);
                } else {
                    // Default handler for all other routes
                    await handle(req, res, parsedUrl);
                }
            } catch (err) {
                console.error('Error occurred handling', req.url, err);
                res.statusCode = 500;
                res.end('internal server error');
            }
        })
            .once('error', (err) => {
                // This catches critical server errors.
                console.error('Server failed to start:', err);
                process.exit(1);
            })
            // The listen call is modified for compatibility with hosting environments
            // like Namecheap's cPanel, which manage the port automatically.
            .listen(() => {
                console.log('> Next.js is ready and listening on the server');
            });
    })
    .catch((err) => {
        // Catches errors from app.prepare()
        console.error('Error during Next.js app preparation:', err.stack);
        process.exit(1);
    });
