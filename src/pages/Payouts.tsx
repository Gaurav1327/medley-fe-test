import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Chip from '../components/Chip';
import Dropdown from '../components/Dropdown';
import { H1 } from '../components/Headers';
import SearchBar from '../components/SearchBar';
import Table from '../components/table';
import { useDebounce } from '../hooks/useDebounce';
import { FormattedRecords } from '../types';
import { ROWS_PER_PAGE } from '../utils/constants';
import { getFormattedDate } from '../utils/getFormattedDate';

const PayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: auto;
    font-family: 'Inter', sans-serif;
    width: 95%;
    max-width: 95%;
    overflow-x: hidden;
`;

const HeadContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 20rem;
    position: relative;
`;

const DropdownContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 2;
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
    const [isLoading, setIsLoading] = useState(false);
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedData, setSearchedData] = useState<Record<string, string>[]>([]);
    const [rowsPerPage, setRowPerPage] = useState(ROWS_PER_PAGE);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(1);

    const [data, setData] = useState<Record<string, string>[]>([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const searchUser = async (username: string) => {
            try {
                const res = await fetch(
                    `${process.env.REACT_BACKEND_API_URL}/search?query=${username}`,
                );
                const data = await res.json();
                setSearchedData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchPaginatedData = async () => {
            try {
                setIsTableLoading(true);
                const res = await fetch(
                    `${process.env.REACT_BACKEND_API_URL}/payouts?page=${currentPage}&limit=${rowsPerPage}`,
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

        if (debouncedSearchTerm === '') {
            fetchPaginatedData();
            setSearchedData([]);
        } else {
            searchUser(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, currentPage, rowsPerPage]);

    const handleSearchTerm = (value: string) => {
        if (value != '') setIsLoading(true);
        else setIsLoading(false);
        setSearchTerm(value);
    };

    const handleSelectUser = (username: string) => {
        setData(searchedData.filter((d) => d.username === username));
        setShowDropdown(false);
        setCurrentPage(1);
        setTotalRows(1);
    };

    const handleInputFocus = (focus: boolean) => {
        setIsFocused(focus);
        if (focus) setShowDropdown(true);
    };

    const emptyMessage = () => {
        if (searchTerm !== '' && isLoading) {
            return `Searching for ${searchTerm}...`;
        } else if (searchTerm !== '' && !isLoading) {
            return `No results found for ${searchTerm}`;
        } else if (searchTerm === '') {
            return 'Try searching for usernames';
        }
    };

    return (
        <PayoutContainer>
            <HeadContainer>
                <H1>Payouts</H1>
                <SearchContainer ref={dropdownRef}>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={handleSearchTerm}
                        isLoading={isLoading}
                        isFocused={isFocused}
                        setIsFocused={handleInputFocus}
                    />
                    {showDropdown && (
                        <DropdownContainer>
                            <Dropdown
                                onSelect={(value) => handleSelectUser(value)}
                                emptyMessage={emptyMessage()}
                                values={searchedData.map((d) => d.username)}
                            />
                        </DropdownContainer>
                    )}
                </SearchContainer>
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
