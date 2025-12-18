import { dateTimeText } from "./constants";

/**
 * Hàm định dạng số
 * @param {*} value 
 * @returns 
 * createdby: pdthien - 15.10.2025
 */
export const formatNumber = (value) => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat().format(value);
};

/**
 * Hàm định dạng ngày tháng dd/MM/yyyy
 * @param {*} value 
 * @returns 
 * createdby: hanv - 24.12.2025
 */
export const formatDate = (value) => {
    if (!value) return ''

    let date

    if (typeof value === 'string' && value.includes('/')) {
        const [day, month, year] = value.split('/').map(Number)
        if (!day || !month || !year) return ''
        date = new Date(year, month - 1, day)
    } else {
        date = new Date(value)
    }

    if (isNaN(date.getTime())) return ''

    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date)
}

/**
 * Hàm định dạng chuỗi
 * @param {*} value 
 * @returns 
 * createdby: pdthien - 15.10.2025
 */
export const formatText = (value) => {
    if (value === null || value === undefined) return '';
    return String(value);
};
/**
 * Trả về số ngày của tháng bất kỳ.
 * @param {number} month - Tháng (1-12).
 * @param {number} year - Năm đầy đủ.
 * @returns {number} - Số ngày trong tháng.
 * Created By hanv 16/12/2025
 */
export const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

/**
 * Định dạng input ngày theo kiểu đang chọn (dd/MM/yyyy, MM/yyyy, yyyy) khi nhập.
 * @param {HTMLInputElement} e - Input ngày.
 * @param {string} [action='add'] - Chế độ add hoặc update.
 * @returns {string} - Giá trị đã định dạng.
 * Created By hanv 16/12/2025
 */
export const formatInputTypeOnInput = (dateInput, dateTimeFormat) => {
    let value = dateInput.replace(/\D/g, '');

    if (dateTimeFormat === dateTimeText.datemonthyear) {
        return formatInputTypeOnInputDayMonthYear(dateInput);

    }
    if (dateTimeFormat === dateTimeText.monthyear) {
        return formatInputTypeOnInputMonthYear(dateInput);
    }
    if (dateTimeFormat === dateTimeText.year) {
        value = value.slice(0, 4);
        // year validation
        if (value.length >= 4) {
            if (value.slice(0, 4) < 1900) value = '1900';
        }
        return value;
    }
}
/**
 * Xóa giá trị nếu không đúng định dạng đã chọn khi blur.
 * @param {HTMLInputElement} e - Input ngày.
 * @param {string} [action='add'] - Chế độ add hoặc update.
 * @returns {string} - Giá trị đã định dạng.
 * Created By hanv 16/12/2025
 */
export const formatInputTypeOnBlur = (dateInput, dateTimeFormat) => {
    if (dateTimeFormat === dateTimeText.datemonthyear) {
        return formatInputTypeOnBlurDayMonthYear(dateInput);
    }
    if (dateTimeFormat === dateTimeText.monthyear) {
        return formatInputTypeOnBlurMonthYear(dateInput);
    }
    if (dateTimeFormat === dateTimeText.year) {
        if (dateInput.length !== 4) {
            return '';
        }
    }
}
/**
 * Định dạng và ràng buộc giá trị MM/yyyy khi nhập.
 * @param {HTMLInputElement} e - Input tháng/năm.
 * @returns {string} - Giá trị đã định dạng.
 * Created By hanv 16/12/2025
 */
export const formatInputTypeOnInputMonthYear = (dateInput) => {
    let value = dateInput.replace(/\D/g, '');
    // month validation
    if (value.length > 2) {
        if (value.slice(0, 2) > 12) value = '12' + value.slice(2);
        if (value.slice(0, 2) < 1) value = '01' + value.slice(2);
        value = value.slice(0, 2) + '/' + value.slice(2, 6);
    }
    // year validation
    if (value.length >= 7) {
        if (value.slice(3, 7) < 1900) value = value.slice(0, 3) + '1900';
    }

    return value;
}
/**
 * Xóa giá trị nếu không đúng MM/yyyy khi blur.
 * @param {HTMLInputElement} e - Input tháng/năm.
 * @returns {string} - Giá trị đã định dạng.
 * Created By hanv 16/12/2025
 */
export const formatInputTypeOnBlurMonthYear = (dateInput) => {
    if (dateInput.length !== 7) {
        return '';
    }
    return dateInput;
}
/**
 * Định dạng và ràng buộc giá trị dd/MM/yyyy khi nhập.
 * @param {HTMLInputElement} e - Input ngày/tháng/năm.
 * @returns {string} - Giá trị đã định dạng.
 * Created By hanv 16/12/2025
 */
export const formatInputTypeOnInputDayMonthYear = (dateInput) => {
    let value = dateInput.replace(/\D/g, '');
    // day validation
    if (value.length > 2) {
        if (value.slice(0, 2) > 31) value = '31' + value.slice(2);
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    // month validation
    if (value.length > 3) {
        if (value.slice(3, 5) > 12) value = value.slice(0, 3) + '12' + value.slice(5);
    }
    if (value.length > 4) {
        if (value.slice(3, 5) < 1) value = value.slice(0, 3) + '01' + value.slice(5);
    }
    // year validation
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
    if (value.length >= 10) {
        if (value.slice(6, 10) < 1900) value = value.slice(0, 6) + '1900';
        if (value.slice(0, 2) > getDaysInMonth(parseInt(value.slice(3, 5)), parseInt(value.slice(6, 10)))) {
            value = getDaysInMonth(parseInt(value.slice(3, 5)), parseInt(value.slice(6, 10))) + value.slice(2)
        }
    }

    return value;
}
/**
 * Xóa giá trị nếu không đúng dd/MM/yyyy khi blur.
 * @param {HTMLInputElement} e - Input ngày/tháng/năm.
 * @returns {string} - Giá trị đã định dạng.
 * Created By hanv 16/12/2025
 */
export const formatInputTypeOnBlurDayMonthYear = (dateInput) => {
    if (dateInput.length !== 10) {
        return '';
    }
    return dateInput;
}

/**
 * Chuyển chuỗi dd/MM/yyyy thành Date; trả về null nếu không hợp lệ.
 * @param {string} str - Chuỗi ngày dd/MM/yyyy.
 * @returns {Date|null} - Đối tượng Date hoặc null.
 * Created By hanv 16/12/2025
 */
export const parseDDMMYYYY = (str) => {
    const [d, m, y] = str.split('/').map(Number);
    const date = new Date(y, m - 1, d);

    if (
        date.getFullYear() !== y ||
        date.getMonth() !== m - 1 ||
        date.getDate() !== d
    ) {
        return null;
    }
    return date;
}
/**
 * Chuyển chuỗi MM/yyyy thành Date đầu tháng; trả về null nếu không hợp lệ.
 * @param {string} str - Chuỗi tháng năm MM/yyyy.
 * @returns {Date|null} - Đối tượng Date hoặc null.
 * Created By hanv 16/12/2025
 */
export const parseMMYYYY = (str) => {
    const [m, y] = str.split('/').map(Number);
    const date = new Date(y, m - 1, 1);
    if (
        date.getFullYear() !== y ||
        date.getMonth() !== m - 1
    ) {
        return null;
    }
    return date;
}