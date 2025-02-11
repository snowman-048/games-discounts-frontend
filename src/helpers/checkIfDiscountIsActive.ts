import moment from 'moment'

const checkIfDiscountIsActive = (discountEndDate: string) =>
  moment(discountEndDate).utc(true).valueOf() > moment().utc(true).valueOf()

export { checkIfDiscountIsActive }
