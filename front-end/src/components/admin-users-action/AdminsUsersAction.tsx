import React, { useEffect, useRef, useState } from 'react'
import './AdminUsersAction.styles.scss'
import App from 'App'
import { UserDto } from 'infrastructure/api-client/dto/user.dto'
import Modal from 'components/modal-wrapper/ModalWrapper'

const AdminUsersAction = () => {
  const [users, setUsers] = useState<UserDto[]>([])
  const [usersCount, setUsersCount] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [deleteConfermation, setDeleteConfermation] = useState(false)
  const [userListIndex, setUserListIndex] = useState(-1)
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

  const updateAndReplace = async (indexId: number) => {
    const { apiClient } = App
    const userToUpdate = users[indexId]
    const response = await apiClient.users.update(userToUpdate.id, { active: !userToUpdate.active })

    if (!response.hasErrors && response.data) {
      const newUserList = [...users]
      newUserList[indexId] = response.data
      setUsers(newUserList)
    }
  }

  const upgradeAndReplace = async (indexId: number, currentRole: string) => {
    const { apiClient } = App
    const userToUpdate = users[indexId]
    let newRoleAsNumber = parseInt(currentRole) + 1
    if (newRoleAsNumber > 2) {
      newRoleAsNumber = 0
    }
    const newRole = newRoleAsNumber.toString()
    const response = await apiClient.users.update(userToUpdate.id, { role: newRole, active: true })

    if (!response.hasErrors && response.data) {
      const newUserList = [...users]
      newUserList[indexId] = response.data
      setUsers(newUserList)
    }
  }

  const deleteAndReplace = async (indexId: number) => {
    const { apiClient } = App
    const userToUpdate = users[indexId]
    const response = await apiClient.users.softDelete(userToUpdate.id)

    if (!response.hasErrors && response.data) {
      const newUserList = [...users]
      console.log(response.data)

      newUserList[indexId] = response.data
      setUsers(newUserList)
      setDeleteConfermation(false)
      setUserListIndex(-1)
    }
  }

  const renderRole = (role: string) => {
    switch (role) {
      case '1':
        return 'Admin'
      case '2':
        return 'Editor'
      default:
        return 'User'
    }
  }

  const handleUpdateAndReplace = (indexId: number) => {
    updateAndReplace(indexId)
  }
  const handleUpgradeAndReplace = (indexId: number, role: string) => {
    upgradeAndReplace(indexId, role)
  }

  const handleDeleteAndReplace = () => {
    if (!(userListIndex === -1)) {
      deleteAndReplace(userListIndex)
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
      <Modal isOpen={deleteConfermation} onClose={() => setDeleteConfermation(false)}>
        <div className="mt-4 p-4">
          <h1 className="text-danger">Stai eliminando l'account di {users[userListIndex]?.nickName}</h1>
          <h2 className="mb-5">Vuoi veramente procedere?</h2>
          <div className="row mb-sm-3 text-center">
            <div className="col-6">
              <button className="button" onClick={() => setDeleteConfermation(false)}>
                No
              </button>
            </div>
            <div className="col-6">
              <button className="button" onClick={handleDeleteAndReplace}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
                      <td>
                        <button
                          className="button"
                          disabled={user.email.includes('*')}
                          onClick={() => {
                            handleUpgradeAndReplace(i, user.role)
                          }}>
                          {renderRole(user.role)}
                        </button>
                      </td>
                      <td>
                        {user.active ? (
                          <button className="text-danger button" onClick={() => handleUpdateAndReplace(i)}>
                            Disabilita
                          </button>
                        ) : (
                          <button
                            className="text-success button"
                            disabled={user.email.includes('*')}
                            onClick={() => handleUpdateAndReplace(i)}>
                            Abilita
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          className="button"
                          disabled={user.email.includes('*')}
                          onClick={() => {
                            setUserListIndex(i)
                            setDeleteConfermation(true)
                          }}>
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
