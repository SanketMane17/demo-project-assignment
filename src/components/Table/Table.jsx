import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./Table.scss"

function Table({ users, loading }) {
  return (
    <div className='app__table'>
      {!loading ? (
        <DragDropContext >
          <table id="customers">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
                <th>Gender</th>
              </tr>
            </thead>
            <Droppable droppableId="tbody">
              {
                (provided) => (
                  <tbody
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    key={1}
                  >
                    {users.map((user, index) => {
                      let statusClass;
                      switch (user.subscription.status) {
                        case "Active":
                          statusClass = "active"
                          break;
                        case "Blocked":
                          statusClass = "blocked"
                          break;
                        case "Pending":
                          statusClass = "pending"
                          break;
                        case "Idle":
                          statusClass = "idle"
                          break;
                        default:
                          statusClass = ""
                      }

                      return (
                        <Draggable draggableId={user.first_name} index={index}>
                          {(provided, snapshot) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={user.uid}
                            >
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>{user.first_name} {user.last_name}</td>
                              <td><span className={statusClass}>{user.subscription.status}</span></td>
                              <td>{user.gender}</td>
                            </tr>
                          )}
                        </Draggable>
                      )
                    }
                    )}
                    {provided.placeholder}
                  </tbody>
                )
              }
            </Droppable>
          </table>
        </DragDropContext>
      ) : (
        <div className='loader'>Getting data....</div>
      )}
    </div>
  )
}

export default Table