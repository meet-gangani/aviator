import React, { useEffect, useState } from 'react'

import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import { MoneyIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import { Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from '@windmill/react-ui'
import UsersService from '../serives/users.service'
import DepositsService from '../serives/deposits.service'
import WithdrawsService from '../serives/withdraws.service'
import * as PropTypes from 'prop-types'

class Avatar extends React.Component {
  render() {
    return null
  }
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string
}

function Payment() {
  const [ page, setPage ] = useState(1)
  const [ data, setData ] = useState([])

  const [ usersList, setUserList ] = useState([])
  const [ depositList, setDepositList ] = useState([])
  const [ withdrawsList, setWithdrawsList ] = useState([])

//user api
  async function getUsersList() {
    const users = await UsersService.getUsers()

    setUserList(users)
  }

  //depositList api
  async function getDepositList() {
    const deposit = await DepositsService.getDeposits()

    setDepositList(deposit)
  }

  async function getWithdrawsList() {
    const withdraws = await WithdrawsService.getWithdraws()

    setWithdrawsList(withdraws)
  }

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [ page ])

  useEffect(() => {
    getUsersList()
    getDepositList()
    getWithdrawsList()
  }, [])

  return (
      <div>
        <PageTitle>Payment</PageTitle>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Account balance" value="$ 46,760.89">
            <RoundIcon
                icon={MoneyIcon}
                iconColorClass="text-green-500 dark:text-green-100"
                bgColorClass="bg-green-100 dark:bg-green-500"
                className="mr-4"
            />
          </InfoCard>
        </div>
        <h2>Deposit Table</h2>
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>userName</TableCell>
                <TableCell>Deposit Amount</TableCell>
                <TableCell>Status</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {
                depositList.map((deposit, i) => {
                  const user = usersList.find(user => user._id === deposit.userId)
                  return (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Avatar className="hidden mr-3 md:block" src={`https://ui-avatars.com/api/?name=${user.username}`} alt="User image"/>
                            <div>
                              <p className="font-semibold">{user.username}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">$ {deposit.amount}</span>
                        </TableCell>
                        <TableCell>
                          <span> {deposit.status} </span>
                        </TableCell>
                      </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
            />
          </TableFooter>
        </TableContainer>

        <h2>Withdraws Table</h2>
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>userName</TableCell>
                <TableCell>Withdraws Amount</TableCell>
                <TableCell>Status</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {
                withdrawsList.map((withdraws, i) => {
                  const user = usersList.find(user => user._id === withdraws.userId)
                  return (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Avatar className="hidden mr-3 md:block" src={`https://ui-avatars.com/api/?name=${user.username}`} alt="User image"/>
                            <div>
                              <p className="font-semibold">{user?.username}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">$ {withdraws.amount}</span>
                        </TableCell>
                        <TableCell>
                          <span> {withdraws.status} </span>
                        </TableCell>
                      </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
            />
          </TableFooter>
        </TableContainer>
      </div>
  )
}

export default Payment
