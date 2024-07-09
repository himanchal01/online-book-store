"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfMiddleware = void 0;
const common_1 = require("@nestjs/common");
let CsrfMiddleware = class CsrfMiddleware {
    use(req, res, next) {
        if (req.method === 'POST' && req.body && req.body.query) {
            const query = req.body.query;
            if (query.includes('mutation UploadImage')) {
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
};
exports.CsrfMiddleware = CsrfMiddleware;
exports.CsrfMiddleware = CsrfMiddleware = __decorate([
    (0, common_1.Injectable)()
], CsrfMiddleware);
//# sourceMappingURL=Csrf.middleware.js.map