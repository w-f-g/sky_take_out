import { Test, TestingModule } from '@nestjs/testing'
import { AddressBookService } from './address-book.service'

describe('AddressBookService', () => {
  let service: AddressBookService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressBookService],
    }).compile()

    service = module.get<AddressBookService>(AddressBookService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
