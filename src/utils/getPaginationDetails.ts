export const getPaginationNumbers = (currentPage: number, totalPages: number) => {
    const pages: number[][] = [];
    if (totalPages <= 5) {
        pages.push(Array.from(Array(totalPages), (_, i) => i + 1));
    } else {
        if (currentPage <= 3) {
            pages.push(Array.from(Array(4), (_, i) => i + 1));

            pages.push([totalPages]);
        } else if (currentPage > totalPages - 3) {
            pages.push([1], [totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
        } else {
            pages.push([1], [currentPage - 1, currentPage, currentPage + 1], [totalPages]);
        }
    }
    return pages;
};
