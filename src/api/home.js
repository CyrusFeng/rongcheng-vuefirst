/* eslint-disable */
import Mock from 'mockjs'

let getList = Mock.mock({
  "success": "@title",
  "message": "@title",
  "data|6-10": [
    {
      "id": "@title",
      "materiel": "@title",
      "supplier": "@title",
      "date": "@title",
      "status": 1,
      "weight": 11111,
      "organization": "@title"
    }
  ]
})

let search = Mock.mock({
  "data|1-10": [
    {
      "name|1-10": "1"
    }
  ],
  "success": "@title",
  "message": "@title"
})
let getMateriel = Mock.mock({
  "data|8": [
    {
      "materiel": "带钢",
      "materielId": "@title"
    }
  ],
  "success": "Pxslfzucl Uxunwjqvpc Jqhhbv Csmipj Idcakos Aceotnrod",
  "message": "Catnxztztl Sroifb Vsajmun"
})
let getOrganization = Mock.mock({
  "data|8": [
    {
      "organization": "中联仓储中心",
      "organizationId": "Biej Kuoosr Qhhdgqdv Ntl"
    }
  ],
  "success": "Pxslfzucl Uxunwjqvpc Jqhhbv Csmipj Idcakos Aceotnrod",
  "message": "Catnxztztl Sroifb Vsajmun"
})

export {
  getList,
  search,
  getMateriel,
  getOrganization,
}
