import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CartPriceResponse } from '@repo/shared/cart';

describe('Cart (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('/cart/calculate (POST)', () => {
    it.each([
      {
        example: '#1 Three different BTTF films',
        input:
          'Back to the Future 1\nBack to the Future 2\nBack to the Future 3',
        output: 36,
      },
      {
        example: '#2 Three different BTTF films',
        input: 'Back to the Future 1\nBack to the Future 3',
        output: 27,
      },
      {
        example: '#3 Only one BTTF film',
        input: 'Back to the Future 1',
        output: 15,
      },
      {
        example: '#4 4 BTTF films, which 3 are different',
        input:
          'Back to the Future 1\nBack to the Future 2\nBack to the Future 3\nBack to the Future 2',
        output: 48,
      },
      {
        example: '#5 Three different BTTF films and one out of saga',
        input:
          'Back to the Future 1\nBack to the Future 2\nBack to the Future 3\nLa chèvre',
        output: 56,
      },
    ])('should return $output for $example', ({ input, output }) => {
      return request(app.getHttpServer())
        .post('/cart/calculate')
        .send({ input })
        .expect(200)
        .expect((res) => {
          expect((res.body as CartPriceResponse).total).toBe(output);
          expect((res.body as CartPriceResponse).currency).toBe('EUR');
        });
    });
    it('should return Bad Request (400) for empty input', () => {
      return request(app.getHttpServer())
        .post('/cart/calculate')
        .send({ input: '' })
        .expect(400);
    });
    it('should return Bad Request (400) for only white space input', () => {
      return request(app.getHttpServer())
        .post('/cart/calculate')
        .send({ input: '    \n     \n      ' })
        .expect(400);
    });
    it('should return Bad Request (400) for missing input', () => {
      return request(app.getHttpServer())
        .post('/cart/calculate')
        .send({})
        .expect(400);
    });
    it('should return Bad Request (400) for input type mismatch', () => {
      return request(app.getHttpServer())
        .post('/cart/calculate')
        .send({ input: 123 })
        .expect(400);
    });
    it('should return Bad Request (400) if extra input', () => {
      return request(app.getHttpServer())
        .post('/cart/calculate')
        .send({ input: 'Movie 1', unexpectedProperty: 'Hello World' })
        .expect(400);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
