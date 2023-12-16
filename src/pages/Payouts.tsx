import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Chip from '../components/Chip';
import { H1 } from '../components/Headers';
import Table from '../components/table';
import { FormattedRecords } from '../types';
import { ROWS_PER_PAGE } from '../utils/constants';
import { getFormattedDate } from '../utils/getFormattedDate';

const PayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: auto;
    font-family: 'Inter', sans-serif;
    width: 90%;
    max-width: 90%;
    overflow-x: hidden;
`;

const HeadContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export const getFormattedData = (data: Record<string, string>[]): FormattedRecords => {
    return {
        tableTitle: 'Payout History',
        filterValues: {
            status: ['Paid', 'Pending'],
        },
        columnsMetadata: [
            { key: 'username', displayName: 'User' },
            { key: 'dateAndTime', displayName: 'Date & Time' },
            { key: 'status', displayName: 'Status' },
            { key: 'value', displayName: 'Value' },
        ],
        data: data.map((record) => ({
            dateAndTime: {
                value: new Date(record.dateAndTime),
                renderValue: <>{getFormattedDate(record.dateAndTime)}</>,
            },
            status: {
                value: record.status == 'Completed' ? 'Paid' : record.status,
                renderValue: (
                    <Chip isPaid={record.status == 'Completed'}>
                        {record.status == 'Completed' ? 'Paid' : record.status}
                    </Chip>
                ),
            },
            value: {
                value: Number(record.value.replace('$', '')),
                renderValue: <>{record.value}</>,
            },
            username: {
                value: record.username,
                renderValue: <>{record.username ?? 'No username'}</>,
            },
        })),
    };
};

function Payouts() {
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [rowsPerPage, setRowPerPage] = useState(ROWS_PER_PAGE);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(1);

    const [data, setData] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        const fetchPaginatedData = async () => {
            try {
                setIsTableLoading(true);
                const res = await fetch(
                    `https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts?page=${currentPage}&limit=${rowsPerPage}`,
                );
                const fetchedData = await res.json();
                setData(fetchedData.data);
                setTotalRows(fetchedData.metadata.totalCount);
            } catch (error) {
                console.error(error);
            } finally {
                setIsTableLoading(false);
            }
        };

        fetchPaginatedData();
    }, [currentPage, rowsPerPage]);

    return (
        <PayoutContainer>
            <HeadContainer>
                <H1>Payouts</H1>
            </HeadContainer>
            <Table
                data={getFormattedData(data)}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                onPageChange={(pageNum) => setCurrentPage(pageNum)}
                onRowsPerPageChange={(rowsNum) => setRowPerPage(rowsNum)}
                totalRows={totalRows}
                isLoading={isTableLoading}
            />
        </PayoutContainer>
    );
}

export default Payouts;
