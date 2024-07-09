import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { ImageModule } from './image/image.module';
import { CloudinaryConfigService } from './cloudinary/cloudinary.config';
import { CsrfMiddleware } from './middleware/Csrf.middleware';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      driver: ApolloDriver,
      context: ({ req }) => ({ req })
    },),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        const dbConnect = process.env.DB_CONNECT
        const userName = process.env.DB_USER
        const password = encodeURIComponent(process.env.DB_PASS)
        const host = process.env.DB_HOST
        const uri = `${dbConnect}${userName}${password}${host}`;
        return {
          uri
        }
      }
    }),

    ConfigModule.forRoot({
      cache: true
    }),
    UserModule, AuthModule, BookModule, ImageModule],

  providers: [AppService, AppResolver, CloudinaryConfigService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }), CsrfMiddleware).forRoutes('graphql');
  }
}
