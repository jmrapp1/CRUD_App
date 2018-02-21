import React, { Component } from 'react';
import './PaginatedTable.css';
import PropTypes from 'prop-types';

function renderColumns(columns) {
    return columns.map((name, index) => {
        return ( <th scope="col" key={ index }>{ name }</th> )
    });
}

function renderData(columns, data, mapData) {
    return data.map((data, index) => {
        return ( <tr>
            {
                columns.map((col, index) => {
                    return ( <td key={ index }>{ mapData(index, data) }</td> );
                })
            }
        </tr> );
    });
}

export const PaginatedTable = ({ columns, data, pageSize, total, mapData, onPageClick, onRowClick }) => {
    return (
        <table className="paginated-table table table-striped">
            <thead>
            <tr>
                { renderColumns(columns) }
            </tr>
            </thead>
            <tbody>
            { data && renderData(columns, data, mapData) }
            </tbody>
        </table>
    );
};

PaginatedTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    mapData: PropTypes.func,
    onPageClick: PropTypes.func,
    onRowClick: PropTypes.func
};