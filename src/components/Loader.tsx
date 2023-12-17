import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingSpinner = styled.div`
    width: 1rem;
    height: 1rem;
    border: 0.125rem solid #f3f3f3;
    border-top: 0.125rem solid #999dff;
    border-right: 0.125rem solid #999dff;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

const Loader = () => {
    return (
        <SpinnerContainer>
            <LoadingSpinner />
        </SpinnerContainer>
    );
};

export default Loader;
