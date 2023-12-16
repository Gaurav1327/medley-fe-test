import 'react-loading-skeleton/dist/skeleton.css';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SortMeta, TableProps } from '../../types';
import { SortOrder } from '../../utils/constants';
import { H2 } from '../Headers';
import Filters from './Filters';
import Pagination from './Pagination';

const Table: React.FC<TableProps> = ({
    data: _data,
    currentPage: _currentPage = 1,
    onPageChange,
    rowsPerPage: _rowsPerPage = 1,
    onRowsPerPageChange,
    totalRows = 1,
}) => {
    const [data, setData] = useState(_data);
    const [currentPage, setCurrentPage] = useState(_currentPage);
    const [rowsPerPage, setRowPerPage] = useState<number>(_rowsPerPage);

    const [filters, setFilters] = useState<{
        filterColumn: string;
        filterValue: any;
    } | null>(null);

    const [sortMeta, setSortMeta] = useState<SortMeta>({
        column: null,
        order: SortOrder.ASC,
    });

    useEffect(() => {
        if (filters == null) {
            setData(_data);
        } else {
            console.log('filtering', _data, filters);
            setData({
                ..._data,
                data: _data.data.filter((record) => record[filters.filterColumn].value == filters.filterValue),
            });
        }
    }, [_data, filters]);

    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            onPageChange && onPageChange(newPage);
        }
    };

    const handleRowPerPageChange = (newRow: number) => {
        setRowPerPage(newRow);
        onRowsPerPageChange && onRowsPerPageChange(newRow);
    };

    const handleSort = (column: string) => {
        if (sortMeta.column === column) {
            setSortMeta((prev) => {
                if (prev.order === SortOrder.ASC) {
                    return { ...prev, order: SortOrder.DESC };
                } else if (prev.order === SortOrder.DESC) {
                    return { column: null, order: SortOrder.ASC };
                }
            });
        } else {
            setSortMeta({ column, order: SortOrder.ASC });
        }
    };

    if (sortMeta?.column) {
        data.data.sort((a, b) => {
            if (a[sortMeta.column].value < b[sortMeta.column].value) return sortMeta.order === SortOrder.ASC ? -1 : 1;
            if (a[sortMeta.column].value > b[sortMeta.column].value) return sortMeta.order === SortOrder.ASC ? 1 : -1;
            return 0;
        });
    }

    return (
        <TableContainer>
            <TableMetadataContainer>
                <TableTitle>
                    <div className='tag' />
                    <H2>{data.tableTitle}</H2>
                </TableTitle>
                {data?.filterValues && (
                    <Filters filterValues={data?.filterValues} filters={filters} setFilters={setFilters} />
                )}
            </TableMetadataContainer>
            <StyledTable>
                <TableHeader>
                    <tr>
                        {data.columnsMetadata.map((column) => (
                            <TableHeaderCell key={column.key}>
                                <TableHeaderCellValues
                                    onClick={() => handleSort(column.key)}
                                    isSorted={sortMeta.column === column.key}
                                >
                                    <div>{column.displayName}</div>
                                    <span>{sortMeta.order === SortOrder.ASC ? '↓' : '↑'}</span>
                                </TableHeaderCellValues>
                            </TableHeaderCell>
                        ))}
                    </tr>
                </TableHeader>
                <TableBody>
                    {data.data.map((record, index) => (
                        <TableRow key={`table-row-index-${index}`}>
                            {data.columnsMetadata.map((column) => (
                                <TableCell key={`data-column-${column.key}-row-${index}`}>
                                    {record[column.key].renderValue}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
            <Pagination
                onChangeRowsPerPage={handleRowPerPageChange}
                currentPage={currentPage}
                totalPages={totalPages}
                changePage={handlePageChange}
            />
        </TableContainer>
    );
};

const TableContainer = styled.div`
    width: 98%;
    display: flex;
    flex-direction: column;
    margin: auto;
`;

const TableMetadataContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const TableTitle = styled.div`
    align-items: center;
    display: inline-flex;
    gap: 1rem;
    position: relative;

    & .tag {
        background-color: #999dff;
        border-radius: 0.25rem;
        height: 3rem;
        position: relative;
        width: 1.5rem;
    }
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-top: 1rem;
    table-layout: fixed;

    @media screen and (max-width: 768px) {
        min-width: unset;
        display: block;
        white-space: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
`;

const TableHeader = styled.thead``;
const TableBody = styled.tbody``;

const TableRow = styled.tr`
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;
    }

    &:nth-child(odd) {
        background-color: #f4f4f4;
    }
`;

const TableHeaderCell = styled.th`
    text-align: left;
    color: #6f767d;
    font-family: 'Inter', Helvetica;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: -0.0075rem;
    line-height: 0.75rem;
    padding: 1rem 1.5rem;
    text-overflow: ellipsis;
`;

const TableHeaderCellValues = styled.div<{
    isSorted?: boolean;
    showFilter?: boolean;
}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    cursor: pointer;

    span {
        font-size: 0.625rem;
        display: ${(props) => (props.isSorted ? 'block' : 'none')};
    }

    &:hover {
        span {
            display: block;
        }
    }
`;

const TableCell = styled.td<{ colorDarker?: boolean }>`
    color: ${(props) => (props.colorDarker ? '#1A1D1F' : '#6f767d')};
    font-family: 'Inter', Helvetica;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: -0.00875rem;
    line-height: 1.5rem;
    padding: 1rem 1.5rem;
    width: 9.375rem;
    min-width: 9.375rem;
    max-width: 9.375rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export default Table;
