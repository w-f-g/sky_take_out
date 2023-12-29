import { Test, TestingModule } from '@nestjs/testing'
import { SetmealService } from './setmeal.service'

describe('SetmealService', () => {
  let service: SetmealService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetmealService],
    }).compile()

    service = module.get<SetmealService>(SetmealService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
