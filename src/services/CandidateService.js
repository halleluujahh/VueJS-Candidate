/**
 * Lấy danh sách ứng viên.
 * @returns {void}
 * Created By hanv 23/12/2025
 */
export const getAllCandidates = () => {
    const candidates = localStorage.getItem("candidates");
    return candidates ? JSON.parse(candidates) : [];
}

let currentPage = 0;
let pageSize = 10;
let candidatesPagination = getAllCandidates();
let totalPages = candidatesPagination.length % pageSize === 0
    ? Math.floor(candidatesPagination.length / pageSize)
    : Math.floor(candidatesPagination.length / pageSize) + 1;
/**
 * Lấy giá trị currentPage.
 * @returns {number} - Trang hiện tại.
 * Created By hanv 23/12/2025
 */
export const getCurrentPage = () => currentPage;
/**
 * Thiết lập giá trị currentPage.
 * @param {number} page - Trang cần thiết lập.
 * @returns {void}
 * Created By hanv 23/12/2025
 */
export const setCurrentPage = (page) => {
    currentPage = page;
};
/**
 * Lấy giá trị pageSize.
 * @returns {number} - Kích thước trang hiện tại.
 * Created By hanv 23/12/2025
 */
export const getPageSize = () => pageSize;
/**
 * Thiết lập giá trị pageSize.
 * @param {number} size - Kích thước trang cần thiết lập.
 * @returns {void}
 * Created By hanv 23/12/2025
 */
export const setPageSize = (size) => {
    pageSize = size;
};
/**
 * Lấy giá trị totalPages.
 * @returns {number} - Số trang hiện tại.
 * Created By hanv 23/12/2025
 */
export const getTotalPages = () => totalPages;
/**
 * Thiết lập giá trị totalPages.
 * @param {number} pages - Số trang cần thiết lập.
 * @returns {void}
 * Created By hanv 23/12/2025
 */
export const setTotalPages = (pages) => {
    totalPages = pages;
};

/**
 * Chuyển về trang trước đó trong bảng ứng viên.
 * @returns {void}
 * Created By hanv 23/12/2025
 */
export const previousPage = () => {
    // const previousPageBtn = document.getElementById("previous-page");
    // const nextPageBtn = document.getElementById("next-page");
    // check if previous page is available
    if (currentPage > 0) {
        currentPage--;
        // paginagationCandidatesTable(candidatesPagination, currentPage, pageSize);
        // if (currentPage == 0) {
        //     previousPageBtn.classList.add("disabled");
        //     nextPageBtn.classList.remove("disabled");
        // }
    }
}
/**
 * Chuyển sang trang kế tiếp trong bảng ứng viên.
 * @returns {void}
 * Created By hanv 23/12/2025
 */
export const nextPage = () => {
    // const previousPageBtn = document.getElementById("previous-page");
    // check if next page is available
    if ((currentPage + 1) * pageSize < candidatesPagination.length) {
        currentPage++;
        // const isLastPage = paginagationCandidatesTable(candidatesPagination, currentPage, pageSize);
        // if (!isLastPage) {
        //     const nextPageBtn = document.getElementById("next-page");
        //     nextPageBtn.classList.add("disabled");
        // }
        // previousPageBtn.classList.remove("disabled");
    }
}
/**
 * Lấy danh sách ứng viên vào bảng khi tìm kiếm theo tên, số điện thoại hoặc email phân trang.
 * @param {string} keyword - Từ khóa tìm kiếm.
 * @returns {Array} - Mảng ứng viên khớp với từ khóa.
 * Created By hanv 23/12/2025
 */
export const getCandidateByNamePhoneEmail = (keyword) => {
    const candidates = getAllCandidates();
    const lowerKeyword = keyword.toLowerCase();
    return candidates.filter(candidate =>
        candidate.fullname.toLowerCase().includes(lowerKeyword) ||
        candidate.phoneNumber.toLowerCase().includes(lowerKeyword) ||
        candidate.email.toLowerCase().includes(lowerKeyword)
    );
}

export const getCandidateById = (id) => {
    const candidates = getAllCandidates();
    return candidates.find(candidate => candidate.id == id)
}

/**
 * Lưu ứng viên vào localstorage.
 * @param {Object} candidate - Đối tượng ứng viên cần lưu.
 * @returns {void}
 * Created By hanv 23/12/2025
 */
export const saveCandidate = (candidate) => {
    const candidates = getAllCandidates();

    const index = candidates.findIndex(c => c.id == candidate.id);
    if (index !== -1) {
        candidates[index] = candidate;
    } else {
        candidates.unshift(candidate);
    }
    localStorage.setItem("candidates", JSON.stringify(candidates));
}