import styled from 'styled-components';

const Chip = styled.span<{ isPaid: boolean }>`
    background-color: ${(props) => (props.isPaid ? '#60CA57' : '#6F767E66')};
    color: #1a1d1f;
    font-weight: bold;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
`;

export default Chip;
