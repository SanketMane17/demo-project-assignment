import React, { useEffect, useState } from 'react'
import Filters from '../Filters/Filters'
import Pagination from '../Pagiantion/Pagination'
import Table from '../Table/Table'
import "./Home.scss";

function Home() {
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    username: "",
    email: "",
    count: "",
    gender: "",
    status: ""
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://random-data-api.com/api/users/random_user?size=100");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filters
  const filterByUsername = (users, username) => users.filter(user => user.username.search(username) !== -1);

  const filterByEmail = (users, email) => users.filter(user => user.email.search(email) !== -1);

  const filterByGender = (users, gender) => users.filter(user => user.gender === gender);

  const filterByStatus = (users, status) => users.filter(user => user.subscription.status === status);

  const applyFilters = () => {
    if (!validateFilters(filters)) return;

    const { username, email, count, gender, status } = filters
    let newItems = [];

    if (username) {
      newItems = filterByUsername(newItems.length === 0 ? users : newItems, username);
    }
    if (email) {
      newItems = filterByEmail(newItems.length === 0 ? users : newItems, email);
    }
    if (gender) {
      newItems = filterByGender(newItems.length === 0 ? users : newItems, gender);
    }
    if (status) {
      newItems = filterByStatus(newItems.length === 0 ? users : newItems, status);
    }
    if(count) {
      setUsersPerPage(count);
    }

    setFilteredUsers(newItems.length ? newItems : users);
  }

  const validateFilters = ({ username, email, count, gender, status }) => {
    if (!username && !email && !count && !gender && !status) {
      alert("Select at least one filter");
      return false;
    }
    return true;
  }

  // Clear Filtes
  const clearFilters = () => {
    setFilters({
      username: "",
      email: "",
      count: "",
      gender: "",
      status: ""
    });
    setFilteredUsers(users);
  }

  // Pagination
  const lastProductIndex = currentPage * usersPerPage;
  const firstProductIndex = lastProductIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstProductIndex, lastProductIndex);

  return (
    <div className='app__home'>
      <div className='container'>
        <div className='app__header'>
          <p>Users({filteredUsers.length})</p>
          <div>
            <button onClick={applyFilters}>Search</button>
            <button onClick={clearFilters}>Reset</button>
          </div>
        </div>
        <div className='app__body'>
          <Filters
            filters={filters}
            setFilters={setFilters}
          />
          <p className='tag'>Showing {currentPage}-{usersPerPage} of {filteredUsers.length}</p>
          <Table users={currentUsers} loading={loading} />
          <Pagination
            totalUsers={filteredUsers.length}
            usersPerPage={usersPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Home