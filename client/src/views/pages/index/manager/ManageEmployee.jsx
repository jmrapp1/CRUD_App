import React, { Component } from 'react';
import Container from '../../../common/components/containers/Container';
import './ManageEmployee.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as EmployeeActions } from '../../../../redux/modules/employee';
import { PaginatedTable } from '../../../common/components/table/PaginatedTable';

const columns = ['First Name', 'Last Name', 'Email', 'Phone'];
const map = ['firstName', 'lastName', 'email', 'phone'];

class ManageEmployee extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.pageSize);
        this.props.getTotalEmployees();
        this.props.getEmployees(this.props.pageSize, 0);

        this.fetchEmployees = this.fetchEmployees.bind(this);
        this.manageEmployee = this.manageEmployee.bind(this);
    }

    componentDidMount() {
    }

    manageEmployee(employee) {
        console.log(JSON.stringify(employee));
        this.props.history.push({
            pathname: '/manage/employee',
            employee
        });
    }

    fetchEmployees(page) {
        this.props.getEmployees(this.props.pageSize, this.props.pageSize * ( page - 1 ));
    }

    render() {
        return (
            <div id="manage-employees">
                <Container className="container col-md-8 col-md-offset-2">
                    <h4><b>Employee List</b></h4>
                    <PaginatedTable columns={ columns } data={ this.props.employees }
                                    mapData={ (index, data) => data[map[index]] } currentPage={ 1 }
                                    total={ this.props.totalEmployees } pageSize={ this.props.pageSize }
                                    onPageClick={ this.fetchEmployees } onRowClick={ this.manageEmployee }/>
                </Container>
            </div>
        );
    }
}

ManageEmployee.propTypes = {
    employees: PropTypes.array,
    totalEmployees: PropTypes.number,
    getEmployees: PropTypes.func,
    getTotalEmployees: PropTypes.func,
    pageSize: PropTypes.number,
    history: PropTypes.object.isRequired
};

export default connect(
    state => ( {
        employees: state.employee.employees,
        totalEmployees: state.employee.total,
        pageSize: 3
    } ),
    dispatch => ( {
        getEmployees: bindActionCreators(EmployeeActions.getEmployees, dispatch),
        getTotalEmployees: bindActionCreators(EmployeeActions.getTotalEmployees, dispatch)
    } )
)(ManageEmployee);
