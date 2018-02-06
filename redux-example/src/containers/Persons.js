import React, { Component } from "react";
import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";
import { connect } from "react-redux";
import * as action from "../store/persons/actions";

// import * as actions (mapstatetoprops, actions)

class Persons extends Component {
  state = {
    persons: []
  };

  personAddedHandler = () => {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name: "Max",
      age: Math.floor(Math.random() * 40)
    };
    this.props.addPerson(newPerson);
  };

  personDeletedHandler = personId => {
    this.props.deletePerson(personId);
    // this.setState(prevState => {
    //   return {
    //     persons: prevState.persons.filter(person => person.id !== personId)
    //   };
    // });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <AddPerson personAdded={this.personAddedHandler} />
        {this.props.persons.map(person => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.personDeletedHandler(person.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  persons: state.person.persons
});

const mapDispatchToProps = {
  addPerson: action.addPerson,
  deletePerson: action.deletePerson
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
