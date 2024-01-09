export interface IAddressBook {
  id: number,
  userId: number,
  consignee: string,
  sex: string,
  phone: string,
  provinceCode: string,
  provinceName: string,
  cityCode: string,
  cityName: string,
  districtCode: string,
  districtName: string,
  detail: string,
  label: string,
  isDefault: number,
}

export interface IAddressBookDTO extends Omit<IAddressBook, 'label' | 'userId' | 'id'> {
  label: number,
  name: string,
  type: number,
}

export interface IEditAddressBookDTO extends IAddressBookDTO {
  id: number,
}
