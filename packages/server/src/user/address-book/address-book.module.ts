import { Module } from '@nestjs/common'
import { AddressBookService } from './address-book.service'
import { AddressBookController } from './address-book.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressBook } from './entities/address-book.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressBook]),
  ],
  controllers: [AddressBookController],
  providers: [AddressBookService],
})
export class UserAddressBookModule {}
