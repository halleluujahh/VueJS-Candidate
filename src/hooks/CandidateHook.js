
import * as CandidateService from '@/services/candidateService.js'

const CandidateHook = (service = CandidateService) => {
    const getCurrentPage = service.getCurrentPage;
    const getPageSize = service.getPageSize;
    const setCurrentPage = service.setCurrentPage;
    const setPageSize = service.setPageSize;
    const getTotalPages = service.getTotalPages;
    const setTotalPages = service.setTotalPages;

    const changePageSize = (size, keyword = '') => {
        setCurrentPage(0);
        setPageSize(size);
        setTotalPages(Math.ceil(service.getAllCandidates().length / size));


        return getAllCandidatesPagination(0, size, keyword);
    }
    const getAllCandidates = service.getAllCandidates;
    const getAllCandidatesPagination = (currentPage = 0, pageSize = 10, keyword = '') => {
        let candidates = [];
        if (keyword) {
            candidates = service.getCandidateByNamePhoneEmail(keyword);
        }
        else {
            candidates = service.getAllCandidates();
        }
        // Cập nhật lại tổng số trang
        setTotalPages(Math.ceil(candidates.length / pageSize));
        const start = currentPage * pageSize;
        const end = start + pageSize;
        return candidates.slice(start, end);
    }
    const nextPage = () => {
        service.nextPage();
    }
    const previousPage = () => {
        service.previousPage();
    }
    const getCandidateByNamePhoneEmail = (searchTerm) => {
        return service.getCandidateByNamePhoneEmail(searchTerm);
    }
    const getCandidateById = (id) => {
        return service.getCandidateById(id);
    }
    const saveCandidate = (candidate) => {
        return service.saveCandidate(candidate);
    }

    return {
        getAllCandidates,
        getAllCandidatesPagination,
        getCandidateByNamePhoneEmail,
        saveCandidate,
        changePageSize,
        nextPage,
        previousPage,
        getCurrentPage,
        getPageSize,
        setCurrentPage,
        setPageSize,
        getTotalPages,
        setTotalPages,
        getCandidateById
    }
}

export default CandidateHook