export class Paginator {
    constructor(totalRows, rowsPerPage, currentPage) {
        this.totalRows = totalRows; // Total number of rows
        this.rowsPerPage = rowsPerPage; // Rows to display per page
        this.currentPage = currentPage; // Current page (1-based index)
    }

    
    getTotalPages() {
        return Math.ceil(this.totalRows / this.rowsPerPage);
    }

    getRowRange() {
        const startRow = (this.currentPage - 1) * this.rowsPerPage ;
        const endRow = Math.min(this.currentPage * this.rowsPerPage, this.totalRows);

        return { startRow, endRow };
    }

    getPaginationInfo() {
        return {
            totalPages: this.getTotalPages(),
            ...this.getRowRange(),
        };
    }
}
