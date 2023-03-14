import React, { useEffect, useState } from 'react'

import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import { MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { Avatar, Badge, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from '@windmill/react-ui'
import UsersService from '../serives/users.service'
import { getBadgeByStatus } from '../utils/functions'

function ManageUsers() {
  const [ page, setPage ] = useState(1)
  const [ data, setData ] = useState([])

  const [ usersList, setUserList ] = useState([])

  async function getUsersList() {
    const users = await UsersService.getUsers()

    setUserList(users)
  }

  // pagination setup
  const resultsPerPage = 10

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // here you would make another server request for new data
  useEffect(() => {
    setData(usersList.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [ page, usersList ])

  useEffect(() => {
    getUsersList()
  }, [])

  const getTotalBalance = () => {
    let balance = 0

    usersList.forEach((user) => {
      balance += user.wallet || 0
    })

    return '₹ ' + balance
  }

  return (
      <>
        <PageTitle>Manage Users</PageTitle>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total clients" value={usersList.length}>
            <RoundIcon
                icon={PeopleIcon}
                iconColorClass="text-orange-500 dark:text-orange-100"
                bgColorClass="bg-orange-100 dark:bg-orange-500"
                className="mr-4"
            />
          </InfoCard>

          <InfoCard title="Balance" value={getTotalBalance(usersList)}>
            <RoundIcon
                icon={MoneyIcon}
                iconColorClass="text-green-500 dark:text-green-100"
                bgColorClass="bg-green-100 dark:bg-green-500"
                className="mr-4"
            />
          </InfoCard>

        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>UserName</TableCell>
                <TableCell>email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Wallet</TableCell>
                <TableCell>Status</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((user, i) => {
                    return (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Avatar className="hidden mr-3 md:block" src={`https://ui-avatars.com/api/?background=random&font-size=0.45&name=${user.username}`} alt="User image"/>
                              <div>
                                <p className="font-semibold">{user.username}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{user.email}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{user.phone}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">₹ {user.wallet}</span>
                          </TableCell>
                          <TableCell>
                            <Badge type={getBadgeByStatus(user.status)}>{user.status}</Badge>
                          </TableCell>
                        </TableRow>
                    )
                  }
              )}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
                totalResults={usersList.length}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
            />
          </TableFooter>
        </TableContainer>
      </>
  )
}

export default ManageUsers
