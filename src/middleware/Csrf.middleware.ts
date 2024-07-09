// src/csrf.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Check if the request is a GraphQL POST request
        if (req.method === 'POST' && req.body && req.body.query) {
            const query = req.body.query;
            // Check if the GraphQL query contains the 'uploadImage' mutation
            if (query.includes('mutation UploadImage')) {
                // Add CSRF headers specifically for uploadImage mutation

                if (!req.headers['x-apollo-operation-name']) {
                    req.headers['x-apollo-operation-name'] = 'uploadImage';
                }
                if (!req.headers['apollo-require-preflight']) {
                    req.headers['apollo-require-preflight'] = 'true';
                }
            }
        }
        next();
    }
}
