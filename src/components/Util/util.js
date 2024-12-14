import { SortOrder } from "./FormStates";

export function resolveNestedAttribute(obj, path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

export function getPageNumbers(totalPages, currentPage) {
    const leftLimit = Math.max(1, currentPage - 5); // Ensure at least page 1
    const rightLimit = Math.min(totalPages, currentPage + 5); // Ensure no more than totalPages

    let startPage = leftLimit;
    let endPage = rightLimit;

    // If the range is less than 11 pages, adjust to fill up
    if (rightLimit - leftLimit + 1 < 11) {
        if (leftLimit === 1) {
            // Shift end range to the right
            endPage = Math.min(totalPages, leftLimit + 10);
        } else if (rightLimit === totalPages) {
            // Shift start range to the left
            startPage = Math.max(1, rightLimit - 10);
        }
    }

    // Generate array of page numbers
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
}

export function sortArray(array, attributeName, order) {
    const copy = [...array]; // Create a shallow copy
    return copy.sort((a, b) => {
        if (attributeName) {
            const valA = resolveNestedAttribute(a, attributeName);
            const valB = resolveNestedAttribute(b, attributeName);
            // Compare values
            if (valA < valB) return order === SortOrder.ASC ? -1 : 1;
            if (valA > valB) return order === SortOrder.ASC ? 1 : -1;

            return 0; // If equal
        }
        return 0;
    });
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}