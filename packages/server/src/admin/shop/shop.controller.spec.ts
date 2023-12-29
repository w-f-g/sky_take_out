import { Test, TestingModule } from '@nestjs/testing'
import { AdminShopController } from './shop.controller'

describe('AdminShopController', () => {
  let controller: AdminShopController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminShopController],
    }).compile()

    controller = module.get<AdminShopController>(AdminShopController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
