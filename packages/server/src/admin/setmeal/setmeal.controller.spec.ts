import { Test, TestingModule } from '@nestjs/testing'
import { SetmealController } from './setmeal.controller'
import { SetmealService } from './setmeal.service'

describe('SetmealController', () => {
  let controller: SetmealController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetmealController],
      providers: [SetmealService],
    }).compile()

    controller = module.get<SetmealController>(SetmealController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
