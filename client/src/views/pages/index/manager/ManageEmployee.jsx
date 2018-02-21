import React, { Component } from 'react';
import Container from '../../../common/components/containers/Container';
import './ManageEmployee.css';
import PropTypes from 'prop-types';
import { Actions as AlertActions } from '../../../../redux/modules/alert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as EmployeeActions } from '../../../../redux/modules/employee';
import { TablePagination, TableSimple } from 'react-pagination-table';
import ReactTable from 'react-table';
import { PaginatedTable } from '../../../common/components/table/PaginatedTable';

const columns = ['Email', 'First Name', 'Last Name', 'Phone'];
const map = ['email', 'firstName', 'lastName', 'phone'];

class ManageEmployee extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getEmployees(10, 0);
    }

    render() {
        return (
            <div id="manage-employees">
                <Container className="container col-md-8 col-md-offset-2">
                    <h4><b>Employee List</b></h4>
                    <PaginatedTable columns={ columns } data={ this.props.employees } mapData={ (index, data) => data[map[index]] } />
                </Container>
            </div>
        );
    }
}

ManageEmployee.propTypes = {
    employees: PropTypes.array,
    getEmployees: PropTypes.func
};

export default connect(
    state => ( {
        employees: state.employee.employees
    } ),
    dispatch => ( {
        getEmployees: bindActionCreators(EmployeeActions.getEmployees, dispatch)
    } )
)(ManageEmployee);
