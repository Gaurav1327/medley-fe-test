import React from 'react';
import styled from 'styled-components';

import { DropdownProps } from '../types';

export const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.2);
    max-height: 20rem;
    overflow-y: auto;
`;

export const DropdownItem = styled.button<{ selected?: boolean }>`
    color: black;
    padding: 1rem;
    font-size: 0.875rem;
    text-align: left;
    border: 0.0625rem solid #f1f1f1;
    background-color: ${(props) => (props.selected ? '#999dff' : 'white')};

    cursor: pointer;

    &:disabled {
        color: #999dff;
        cursor: default;
    }

    &:hover {
        background-color: ${(props) => (props.selected ? '#999dff' : '#f1f1f1')};
    }

    &:disabled:hover {
        background-color: white;
    }
`;

function Dropdown({ values, emptyMessage, onSelect, selectedValue }: DropdownProps) {
    const handleSelect = (value: string) => {
        onSelect(value);
    };

    return (
        <DropdownContainer>
            {values.length ? (
                values.map((value) => (
                    <DropdownItem key={value} selected={selectedValue == value} onClick={() => handleSelect(value)}>
                        {value}
                    </DropdownItem>
                ))
            ) : (
                <DropdownItem disabled>{emptyMessage ?? 'No results found'}</DropdownItem>
            )}
        </DropdownContainer>
    );
}

export default Dropdown;
