import { ReactElement } from 'react';

export interface FormattedRecords {
    tableTitle: string;
    filterValues?: Record<string, string[]>;
    columnsMetadata: {
        key: string;
        displayName: string;
    }[];
    data: Record<
        string,
        {
            value: any;
            renderValue: ReactElement<any>;
        }
    >[];
}

export interface TableProps {
    data: FormattedRecords;
    rowsPerPage?: number;
    totalRows?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    isLoading?: boolean;
}