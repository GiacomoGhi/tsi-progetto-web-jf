import React, { useEffect, useRef, useState } from 'react'
import './AdminUsersAction.styles.scss'
import App from 'App'
import { UserDto } from 'infrastructure/api-client/dto/user.dto'

const AdminUsersAction = () => {
  const [users, setUsers] = useState<UserDto[]>([])
  const [usersCount, setUsersCount] = useState(0)
  const [searchText, setSearchText] = useState('')
  const containerRef = useRef<HTMLDivElement | null>(null)

  const fetchItems = async (from: number, to: number, filtered = false) => {
    const { apiClient } = App

    const response = await apiClient.users.paged({
      from,
      to,
      filters: [{ field: 'nickName', value: searchText }]
    })

    if (!response.hasErrors && response.data) {
      const data = [...users, ...response.data.items]
      if (filtered) {
        setUsersCount(response.data.totalCount)
        setUsers(response.data.items)
      } else {
        setUsersCount(response.data.totalCount)
        setUsers(data)
      }
    }
  }

  const handleFilterSelected = () => {
    fetchItems(10, 0, true)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleScroll = () => {
      const scrolled = container.scrollTop * 1.2
      const maxScroll = container.scrollHeight - container.clientHeight
      if (scrolled >= maxScroll) {
        if (users.length === usersCount) return
        fetchItems(users.length + 5, users.length)
      }
    }
    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [containerRef, users])

  useEffect(() => {
    fetchItems(10, 0)
  }, [])

  return (
    <>
      <div className="borderContainer p-3">
        <div className="row text-center mb-3 pt-2">
          <div className="col-lg-6">
            <h1 className="fs-3">Ricerca utenti per Nick Name:</h1>
          </div>
          <div className="col-lg-4">
            <input
              className="form-control"
              placeholder="Nick Name"
              type="text"
              onChange={e => {
                setSearchText(e.target.value)
              }}
            />
          </div>
          <div className="col-lg-1">
            <button className="button" onClick={handleFilterSelected}>
              Search
            </button>
          </div>
        </div>
        <div className="scrollableContainer" ref={containerRef}>
          <table className="table">
            <thead className="tableHeader">
              <tr className="tableRow">
                <th>Nome</th>
                <th>Nickname</th>
                <th>Roulo</th>
                <th>Attivo</th>
                <th>Elimina</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td>{user.name}</td>
                      <td>{user.nickName}</td>
                      <td>{user.role}</td>
                      <td>
                        {user.active ? (
                          <button className="text-danger button">Disabilita</button>
                        ) : (
                          <button className="text-success button">Abilita</button>
                        )}
                      </td>
                      <td>
                        <button className="button" disabled={user.email.includes('*')}>
                          Delete User
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminUsersAction
