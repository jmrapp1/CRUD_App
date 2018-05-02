import React, { Component } from 'react';
import Container from '../../../common/components/containers/Container';
import './ManageEmployee.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as EmployeeActions } from '../../../../redux/modules/employee';
import { PaginatedTable } from '../../../common/components/table/PaginatedTable';
import { Actions as UserActions } from '../../../../redux/modules/user';
import { UserRoles } from '../../../../redux/UserRoles';

const columns = ['First Name', 'Last Name', 'Email', 'Phone'];
const map = ['firstName', 'lastName', 'email', 'phone'];

/**
 * Creates Manage Employee Page
 */
class ManageEmployee extends Component {

    constructor(props) {
        super(props);

        UserActions.validateUserRole(this.props.user, UserRoles.MANAGER, this.props.history);

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
    /**
     * Employee List
     */
    employees: PropTypes.array,
    /**
     * Total Employee Number
     */
    totalEmployees: PropTypes.number,
    /**
     * Function to get employee
     */
    getEmployees: PropTypes.func,
    /**
     * Function to get total employee number
     */
    getTotalEmployees: PropTypes.func,
    /**
     * Page Size
     */
    pageSize: PropTypes.number,
    /**
     * User history
     */
    history: PropTypes.object.isRequired,
    /**
     * User data
     */
    user: PropTypes.node.isRequired
};

export default connect(
    state => ( {
        employees: state.employee.employees,
        totalEmployees: state.employee.total,
        pageSize: 3,
        user: state.user.user
    } ),
    dispatch => ( {
        getEmployees: bindActionCreators(EmployeeActions.getEmployees, dispatch),
        getTotalEmployees: bindActionCreators(EmployeeActions.getTotalEmployees, dispatch)
    } )
)(ManageEmployee);
