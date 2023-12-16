import { ReactElement } from 'react';

import { SortOrder } from './utils/constants';

export interface DropdownProps {
    values: any[];
    onSelect: (value: any) => void;
    emptyMessage?: string;
    selectedValue?: any;
}

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

export interface SortMeta {
    column: string | null;
    order: SortOrder;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    changePage: (page: number) => void;
    onChangeRowsPerPage: (rowsPerPage: number) => void;
}
