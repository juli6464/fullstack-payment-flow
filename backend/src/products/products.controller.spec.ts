import { Test, TestingModule } from '@nestjs/testing';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  const productsServiceMock = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products', async () => {
    const products = [
      {
        id: '1',
        name: 'T-Shirt',
        price: 50000,
        stock: 5,
      },
    ];

    productsServiceMock.findAll.mockResolvedValue(products);

    const result = await controller.findAll();

    expect(result).toEqual(products);
    expect(productsServiceMock.findAll).toHaveBeenCalledTimes(1);
  });
});