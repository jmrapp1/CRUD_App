import React, { Component } from 'react';
import Container from '../../../common/components/containers/Container';
import './ManageEmployee.css';
import PropTypes from 'prop-types';


const $ = require('jquery');
$.DataTable = require('datatables.net');

const columns = [
    {
        title: 'First Name',
        width: 120,
        data: 'first'
    },
    {
        title: 'Last Name',
        width: 180,
        data: 'last'
    },

];

const datas =[
    {
        first: 'Mike',
        last: 'Rivera'
    },
    {
        first: 'Jon',
        last: 'Rapp'
    }

];
class ManageEmployee extends Component {

    componentDidMount() {
        $(this.refs.main).DataTable({
            dom: '<"data-table-wrapper"t>',
            data: datas,
            columns,
            ordering: false
        });
    }
    componentWillUnmount(){
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <div id="manage">
                <Container className="container col-md-4 col-md-offset-4">
                    <h4><b><ins>Employee List</ins></b></h4>
                    <table ref="main" />
                </Container>
            </div>);
    }
}

ManageEmployee.PropTypes ={
    names: PropTypes.array
}
export default ManageEmployee;
