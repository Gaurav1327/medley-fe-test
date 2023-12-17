import React from 'react';
import styled from 'styled-components';

import { PaginationProps } from '../../types';
import { getPaginationNumbers } from '../../utils/getPaginationDetails';

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.25rem;

    @media (max-width: 600px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

const PaginationControls = styled.div`
    display: flex;
    align-items: center;
`;

const PaginationButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    margin: 0 0.25rem;
    color: #1a1d1f;
    transition: color 0.3s ease;

    &:hover {
        color: #60ca57;
    }
`;

const PageDropdown = styled.select`
    margin: 0 0.5rem;
    padding: 0.375rem 0.5rem;
`;

const PageNumber = styled.span<{ isActive: boolean }>`
    margin: 0 0.25rem;
    cursor: pointer;
    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
    color: ${(props) => (props.isActive ? 'white' : '#1A1D1F')};
    transition: color 0.3s ease;
    padding: 0.25rem 0.5rem;
    background-color: ${(props) => (props.isActive ? '#999dff' : '#e4e4e4')};
    border-radius: 0.25rem;

    &:hover {
        color: #999dff;
    }
`;

const PaginationInfo = styled.span``;

function Pagination({ currentPage, totalPages, changePage, onChangeRowsPerPage }: PaginationProps) {
    const paginationNumbers = getPaginationNumbers(currentPage, totalPages);

    return (
        <PaginationContainer>
            <PaginationControls>
                <PaginationButton onClick={() => changePage(currentPage - 1)}>&#8249;</PaginationButton>
                {paginationNumbers.map((numbers, i) => (
                    <div key={`pagination-page-group-${i}`}>
                        {numbers.map((number) => (
                            <PageNumber
                                key={number}
                                isActive={number === currentPage}
                                onClick={() => changePage(number)}
                            >
                                {number}
                            </PageNumber>
                        ))}
                        {i != paginationNumbers.length - 1 && (
                            <PageNumber
                                onClick={() => changePage(numbers[numbers.length - 1] + 1)}
                                key={i}
                                isActive={false}
                            >
                                ...
                            </PageNumber>
                        )}
                    </div>
                ))}
                <PaginationButton onClick={() => changePage(currentPage + 1)}>&#8250;</PaginationButton>
            </PaginationControls>
            <PaginationInfo>
                <span>Show:</span>
                <PageDropdown
                    onChange={(e: any) => Number(e.target.value) > 0 && onChangeRowsPerPage(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </PageDropdown>
                <span>rows</span>
            </PaginationInfo>
        </PaginationContainer>
    );
}

export default Pagination;
