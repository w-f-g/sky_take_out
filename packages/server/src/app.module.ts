import { Module } from '@nestjs/common'
import { EmployeeModule } from './employee/employee.module'

@Module({
  imports: [EmployeeModule],
})
export class AppModule {}
