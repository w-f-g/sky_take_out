import { Test, TestingModule } from '@nestjs/testing'
import { UserShopController } from './shop.controller'

describe('UserShopController', () => {
  let controller: UserShopController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserShopController],
    }).compile()

    controller = module.get<UserShopController>(UserShopController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
