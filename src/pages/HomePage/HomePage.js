import React, { useEffect, useState } from "react";
import { UserService } from "../../services"; 
import { useSelector } from "react-redux";
import { FilterForm, CustomTable } from "../../components"; 

const HomePage = () => {
  const [users, setUsers] = useState([]); 
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: ""
  });
  
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        return; 
      }

      try {
        const usersData = await UserService(token); 
        setUsers(usersData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, [token]); 

  const columns = [
    { label: "First Name", field: "name.first" },
    { label: "Last Name", field: "name.last", align: "right" },
    { label: "Email", field: "email", align: "right" },
    { label: "Phone Number", field: "phone", align: "right" },
    { label: "Location", field: "location.city", align: "right" },
  ];

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.first.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      user.name.last.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.phone.toLowerCase().includes(filters.phoneNumber.toLowerCase()) &&
      user.location.city.toLowerCase().includes(filters.city.toLowerCase())
    );
  });

  return (
    <div>
      <FilterForm filters={filters} onFilterChange={handleFilterChange} />
        
      <div style={{ paddingLeft: 16, paddingRight: 16 }}>
        <CustomTable columns={columns} data={filteredUsers} />
      </div>
    </div>
  );
};

export default HomePage;
