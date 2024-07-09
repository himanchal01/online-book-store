"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const path_1 = require("path");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@nestjs/config");
const app_resolver_1 = require("./app.resolver");
const auth_module_1 = require("./auth/auth.module");
const book_module_1 = require("./book/book.module");
const graphql_upload_1 = require("graphql-upload");
const image_module_1 = require("./image/image.module");
const cloudinary_config_1 = require("./cloudinary/cloudinary.config");
const Csrf_middleware_1 = require("./middleware/Csrf.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 10000000, maxFiles: 10 }), Csrf_middleware_1.CsrfMiddleware).forRoutes('graphql');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                playground: true,
                driver: apollo_1.ApolloDriver,
                context: ({ req }) => ({ req })
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: () => {
                    const dbConnect = process.env.DB_CONNECT;
                    const userName = process.env.DB_USER;
                    const password = encodeURIComponent(process.env.DB_PASS);
                    const host = process.env.DB_HOST;
                    const uri = `${dbConnect}${userName}${password}${host}`;
                    return {
                        uri
                    };
                }
            }),
            config_1.ConfigModule.forRoot({
                cache: true
            }),
            user_module_1.UserModule, auth_module_1.AuthModule, book_module_1.BookModule, image_module_1.ImageModule
        ],
        providers: [app_service_1.AppService, app_resolver_1.AppResolver, cloudinary_config_1.CloudinaryConfigService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map