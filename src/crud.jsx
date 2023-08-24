import React, { Component } from 'react';
import './index.css';

class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newName: '',
      newAge: '',
      newStatus: '',
      newGmail: '',
      searchTerm: '',
      editingIndex: -1,
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addUser = () => {
    const { newName, newAge, newStatus, newGmail } = this.state;
    const newUser = {
      name: newName,
      age: newAge,
      status: newStatus,
      gmail: newGmail,
    };

    this.setState(prevState => ({
      users: [...prevState.users, newUser],
      newName: '',
      newAge: '',
      newStatus: '',
      newGmail: '',
    }));
  };

  editUser = index => {
    const userToEdit = this.state.users[index];
    this.setState({
      editingIndex: index,
      newName: userToEdit.name,
      newAge: userToEdit.age,
      newStatus: userToEdit.status,
      newGmail: userToEdit.gmail,
    });
  };

  saveEdit = index => {
    const updatedUsers = [...this.state.users];
    updatedUsers[index] = {
      name: this.state.newName,
      age: this.state.newAge,
      status: this.state.newStatus,
      gmail: this.state.newGmail,
    };

    this.setState({
      users: updatedUsers,
      editingIndex: -1,
      newName: '',
      newAge: '',
      newStatus: '',
      newGmail: '',
    });
  };

  deleteUser = index => {
    const updatedUsers = this.state.users.filter((user, i) => i !== index);
    this.setState({ users: updatedUsers });
  };

  render() {
    const { users, newName, newAge, newStatus, newGmail, searchTerm, editingIndex } = this.state;

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <div className="search-container df">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            name="searchTerm"
            onChange={this.handleInputChange}
          />
          <button className="search-button" onClick={this.handleSearch}>
           search
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Status</th>
              <th>Gmail</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{editingIndex === index ? <input type="text" value={newName} name="newName" onChange={this.handleInputChange} /> : user.name}</td>
                <td>{editingIndex === index ? <input type="text" value={newAge} name="newAge" onChange={this.handleInputChange} /> : user.age}</td>
                <td>{editingIndex === index ? <input type="text" value={newStatus} name="newStatus" onChange={this.handleInputChange} /> : user.status}</td>
                <td>{editingIndex === index ? <input type="text" value={newGmail} name="newGmail" onChange={this.handleInputChange} /> : user.gmail}</td>
                <td>
                  {editingIndex === index ? (
                    <button onClick={() => this.saveEdit(index)}>Save</button>
                  ) : (
                    <button onClick={() => this.editUser(index)}>Edit</button>
                  )}
                </td>
                <td>
                  <button onClick={() => this.deleteUser(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2>Add User</h2>
          <input
            type="text"
            placeholder="Name"
            value={newName}
            name="newName"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Age"
            value={newAge}
            name="newAge"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Status"
            value={newStatus}
            name="newStatus"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Gmail"
            value={newGmail}
            name="newGmail"
            onChange={this.handleInputChange}
          />
          <button onClick={this.addUser}>Add User</button>
        </div>
      </div>
    );
  }
}

export default Crud;
