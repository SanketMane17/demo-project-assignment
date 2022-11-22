import React from 'react'
import "./Filters.scss";

function Filters({filters, setFilters}) {
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFilters((prev) => ({
      ...prev,
      [name]: target.value
    }))
  }

  return (
    <div className='app__filters'>
      <div>
        <label htmlFor="username">Search by Username</label>
        <input
          type="text"
          placeholder='Search...'
          name='username'
          value={filters.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Search by Email</label>
        <input
          type="email"
          placeholder='Search...'
          name='email'
          value={filters.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="count">Count</label>
        <input
          type="text"
          placeholder='10'
          name="count"
          value={filters.count}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select
          name='gender'
          value={filters.gender}
          onChange={handleChange}
        >
          <option value="#">Select a Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Polygender">Polygender</option>
          <option value="Bigender">Bigender</option>
          <option value="Bigender">Genderfluid</option>
        </select>
      </div>
      <div>
        <label htmlFor="status">Subscription Status</label>
        <select
          name='status'
          value={filters.status}
          onChange={handleChange}
        >
          <option value="#">Select a Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Blocked">Blocked</option>
          <option value="Idle">Idle</option>
        </select>
      </div>
    </div>
  )
}

export default Filters