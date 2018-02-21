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

const columns = ['First Name', 'Last Name', 'Email', 'Phone'];
const map = ['firstName', 'lastName', 'email', 'phone'];
const pageSize = 10;

class ManageEmployee extends Component {

    constructor(props) {
        super(props);
        this.fetchEmployees = this.fetchEmployees.bind(this);
    }

    componentDidMount() {
        this.props.getEmployees(pageSize, 0);
    }

    fetchEmployees(page) {
        this.props.getEmployees(pageSize, pageSize * (page - 1));
    }

    render() {
        return (
            <div id="manage-employees">
                <Container className="container col-md-8 col-md-offset-2">
                    <h4><b>Employee List</b></h4>
                    <PaginatedTable columns={ columns } data={ this.props.employees }
                                    mapData={ (index, data) => data[map[index]] } currentPage={ 5 }
                                    total={ 300 } pageSize onPageClick={ this.fetchEmployees } />
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
