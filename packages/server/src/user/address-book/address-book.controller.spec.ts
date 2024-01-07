import { Test, TestingModule } from '@nestjs/testing'
import { AddressBookController } from './address-book.controller'
import { AddressBookService } from './address-book.service'

describe('AddressBookController', () => {
  let controller: AddressBookController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressBookController],
      providers: [AddressBookService],
    }).compile()

    controller = module.get<AddressBookController>(AddressBookController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
