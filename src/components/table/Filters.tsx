import React, { useState } from 'react';
import styled from 'styled-components';

import Dropdown from '../Dropdown';

const FilterGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 600px) {
        margin-top: 0.5rem;
        margin-left: auto;
    }
`;

const Filter = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 2rem;
    max-height: 2rem;
    span {
        font-size: inherit;
    }
`;

const FilterBox = styled.div`
    position: relative;
    max-height: 2rem;
`;

export interface Filter {
    filterColumn: string;
    filterValue: string;
}

export interface FiltersProps {
    filters: Filter;
    filterValues: Record<string, string[]>;
    setFilters: (filter: Filter) => void;
}

function Filters({ filters, filterValues, setFilters }: FiltersProps) {
    const [showFilterDropDown, setShowFilterDropdown] = useState<string | null>(null);

    const handleFilter = (column: string, value: any) => {
        if (column == null || (column == filters?.filterColumn && value == filters?.filterValue)) {
            setFilters(null);
        } else {
            setFilters({ filterColumn: column, filterValue: value });
        }
        setShowFilterDropdown(null);
    };

    const handleFilterDropdown = (column: string) => {
        setShowFilterDropdown((prev) => {
            return column == prev ? null : column;
        });
    };

    return (
        <FilterGroup>
            {filters && (
                <Filter onClick={() => handleFilter(null, null)}>
                    <span className='material-icons'>cancel</span> Clear filters
                </Filter>
            )}
            {Object.keys(filterValues).map((filterKey) => (
                <FilterBox key={`filter-item-${filterKey}`}>
                    <Filter onClick={() => handleFilterDropdown(filterKey)}>
                        <span className='material-icons'>tune</span>
                            {filterKey}
                        <span className='material-icons'>expand_more</span>
                    </Filter>
                    {filterKey === showFilterDropDown && (
                        <Dropdown
                            selectedValue={filters?.filterColumn == filterKey && filters?.filterValue}
                            values={filterValues[filterKey]}
                            onSelect={(value) => handleFilter(filterKey, value)}
                        />
                    )}
                </FilterBox>
            ))}
        </FilterGroup>
    );
}

export default Filters;
