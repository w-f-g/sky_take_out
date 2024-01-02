export interface IWXLoginDTO {
  code: string,
}

export interface IWXLoginVO {
  id: string | number,
  openid: string,
  token: string,
}

export interface IUserEntity {
  id: number,
  openid: string,
  name: string,
  phone: string,
  sex: string,
  idNumber: string,
  avatar: string,
  createTime: Date,
}