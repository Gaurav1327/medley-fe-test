import React from 'react';
import styled from 'styled-components';

import { SearchBarProps } from '../types';
import Loader from './Loader';

const SearchInputBox = styled.div`
    display: flex;
    align-items: center;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 1rem 3rem;
    border: 0.0625rem solid #ccc;
    border-radius: 1.5rem;
    outline: none;

    &::placeholder {
        color: #a8a8a8;
    }

    &:focus {
        border-color: #999dff;
    }
`;

const SearchIcon = styled.div<{ isFocused: boolean }>`
    position: absolute;
    left: 1rem;
    height: 50%;
    font-weight: bold;
    color: ${(props) => (props.isFocused ? '#999dff' : '#a8a8a8')};
    cursor: pointer;
`;

const ActionIcon = styled.div`
    position: absolute;
    right: 1rem;
    height: 50%;
    color: #999dff;
    cursor: pointer;
`;

function SearchBar({ searchTerm, setSearchTerm, isLoading, isFocused, setIsFocused }: SearchBarProps) {
    const ActionItem = () => {
        if (isLoading) {
            return <Loader />;
        } else if (searchTerm !== '') {
            return (
                <span className='material-icons' onClick={() => setSearchTerm('')}>
                    cancel
                </span>
            );
        } else {
            return <></>;
        }
    };

    return (
        <SearchInputBox>
            <SearchInput
                type='text'
                placeholder='Search by username'
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <SearchIcon isFocused={isFocused}>
                <span className='material-symbols-outlined'>search</span>
            </SearchIcon>

            <ActionIcon>{ActionItem()}</ActionIcon>
        </SearchInputBox>
    );
}

export default SearchBar;
