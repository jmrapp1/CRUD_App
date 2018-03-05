import React, { Component } from 'react';
import Container from '../../../common/components/containers/Container';
import './ManageCustomer.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions as CustomerActions } from '../../../../redux/modules/customer';
import { PaginatedTable } from '../../../common/components/table/PaginatedTable';

const columns = ['First Name', 'Last Name', 'Email', 'Phone'];
const map = ['firstName', 'lastName', 'email', 'phone'];

class ManageCustomer extends Component {

    constructor(props) {
        super(props);
        this.props.getTotalCustomers();
        this.props.getCustomers(this.props.pageSize, 0);

        this.fetchCustomers = this.fetchCustomers.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }

    componentDidMount() {
    }

    fetchCustomers(page) {
        this.props.getCustomers(this.props.pageSize, this.props.pageSize * ( page - 1 ));
    }

    onRowClick(data) {

    }

    render() {
        return (
            <div id="manage-customers">
                <Container className="container col-md-8 col-md-offset-2">
                    <h4><b>Customer List</b></h4>
                    <PaginatedTable columns={ columns } data={ this.props.customers }
                                    mapData={ (index, data) => data[map[index]] } currentPage={ 1 }
                                    total={ this.props.totalCustomers } pageSize={ this.props.pageSize } onPageClick={ this.fetchCustomers }
                    onRowClick={  }/>
                </Container>
            </div>
        );
    }
}

ManageCustomer.propTypes = {
    customers: PropTypes.array,
    totalCustomers: PropTypes.number,
    getCustomers: PropTypes.func,
    getTotalCustomers: PropTypes.func,
    pageSize: PropTypes.number
};

export default connect(
    state => ( {
        customers: state.customer.customers,
        totalCustomers: state.customer.total,
        pageSize: 3
    } ),
    dispatch => ( {
        getCustomers: bindActionCreators(CustomerActions.getCustomers, dispatch),
        getTotalCustomers: bindActionCreators(CustomerActions.getTotalCustomers, dispatch)
    } )
)(ManageCustomer);
