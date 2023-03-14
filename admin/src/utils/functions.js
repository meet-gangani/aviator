export const getBadgeByStatus = (status) => {
  switch (status) {

      // case '' :
      //   return 'primary'

    case 'ACTIVE' :
    case 'COMPLETED' :
      return 'success'

    case 'INACTIVE' :
      return 'danger'

    case 'PENDING' :
      return 'warning'

    default :
      return 'neutral'
  }
}