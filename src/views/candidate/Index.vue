<script setup>
import MsTable from '@/components/controller/ms-table/MsTable.vue'
import CommonEnums from '@/enums/commons.js'
import CandidateHook from '@/hooks/candidateHook.js'
import { reactive, ref, watch } from 'vue'
import CandidateModal from './CandidateModal.vue'

const props = defineProps({
  isRecruitmentContainerCollapse: {
    type: Boolean,
    default: false,
  },
})

// Define table header for candidate table
const candidateTableHead = [
  {
    label: 'Số điện thoại',
    value: 'phoneNumber',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Nguồn ứng viên',
    value: 'candidateResource',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Họ và tên',
    value: 'fullname',
    type: CommonEnums.typeInput.custom,
  },
  {
    label: 'Email',
    value: 'email',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Chiến dịch tuyển dụng',
    value: 'campaign',
    type: CommonEnums.typeInput.date,
  },
  {
    label: 'Vị trí tuyển dụng',
    value: 'position',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Tin tuyển dụng',
    value: 'post',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Vòng tuyển dụng',
    value: 'round',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Đánh giá',
    value: 'rate',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Ngày ứng tuyển',
    value: 'createdAt',
    type: CommonEnums.typeInput.date,
  },
  {
    label: 'Trình độ đào tạo',
    value: 'level',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Nơi đào tạo',
    value: 'location',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Chuyên ngành',
    value: 'major',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Nơi làm việc gần đây',
    value: 'recentWorkplace',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Nhân sự khai thác',
    value: 'humanResource',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Đơn vị sử dụng',
    value: 'unitUsed',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Phù hợp với chân dung',
    value: 'matchProfile',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Khu vực',
    value: 'region',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Người giới thiệu',
    value: 'refferal',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Thông tin tiếp nhận',
    value: 'informationReceived',
    type: CommonEnums.typeInput.string,
  },
  {
    label: 'Thuộc kho tiềm năng',
    value: 'potentialStorage',
    type: CommonEnums.typeInput.string,
  },
]

const {
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
  getCandidateById,
} = CandidateHook()

const candidateUpdate = ref(null)

// Define table body for candidate table
const candidateTableBody = reactive(getAllCandidatesPagination())
const keywordSearch = ref('')
const totalElements = ref(getAllCandidates().length)

const paginationState = reactive({
  currentPage: getCurrentPage(),
  pageSize: getPageSize(),
  totalPages: getTotalPages(),
})

function nextPageCandidate() {
  nextPage()
  paginationState.currentPage = getCurrentPage()
  paginationState.pageSize = getPageSize()
  paginationState.totalPages = getTotalPages()

  Object.assign(
    candidateTableBody,
    getAllCandidatesPagination(
      getCurrentPage(),
      getPageSize(),
      keywordSearch ? keywordSearch.value.trim() : '',
    ),
  )
}
function previousPageCandidate() {
  previousPage()
  paginationState.currentPage = getCurrentPage()
  paginationState.pageSize = getPageSize()
  paginationState.totalPages = getTotalPages()
  Object.assign(
    candidateTableBody,
    getAllCandidatesPagination(
      getCurrentPage(),
      getPageSize(),
      keywordSearch ? keywordSearch.value.trim() : '',
    ),
  )
}
function changePageSizeFunc(size) {
  changePageSize(size, keywordSearch ? keywordSearch.value.trim() : '')
  paginationState.currentPage = getCurrentPage()
  paginationState.pageSize = getPageSize()
  paginationState.totalPages = getTotalPages()

  candidateTableBody.length = 0
  Object.assign(
    candidateTableBody,
    getAllCandidatesPagination(
      paginationState.currentPage,
      paginationState.pageSize,
      keywordSearch ? keywordSearch.value.trim() : '',
    ),
  )
}
// Watch keywordSearch to filter candidates
watch(keywordSearch, () => {
  const keyword = keywordSearch.value.trim()
  if (!keyword) {
    setCurrentPage(0)
    paginationState.currentPage = getCurrentPage()

    Object.assign(
      candidateTableBody,
      getAllCandidatesPagination(paginationState.currentPage, paginationState.pageSize, ''),
    )
    paginationState.totalPages = getTotalPages()
    totalElements.value = getAllCandidates().length
    return
  }

  const filteredCandidates = getAllCandidatesPagination(
    paginationState.currentPage,
    paginationState.pageSize,
    keywordSearch.value.trim(),
  )
  paginationState.totalPages = getTotalPages()

  totalElements.value = filteredCandidates.length
  candidateTableBody.length = 0
  candidateTableBody.push(...filteredCandidates)
})

// Ref open add candidate modal
const isModalOpen = ref(false)
const isAdd = ref(true)
const isSaved = ref(false)
// Function to open add candidate modal
function openAddCandidateModal() {
  isAdd.value = true
  isModalOpen.value = !isModalOpen.value
}
function closeCandidateModal() {
  isModalOpen.value = false
}
function openUpdateCandidateModal(id) {
  isAdd.value = false
  isModalOpen.value = true
  candidateUpdate.value = getCandidateById(id)
}

watch(isSaved, () => {
  // Refresh candidate table data when a candidate is added or updated
  Object.assign(
    candidateTableBody,
    getAllCandidatesPagination(
      paginationState.currentPage,
      paginationState.pageSize,
      keywordSearch ? keywordSearch.value.trim() : '',
    ),
  )
  paginationState.totalPages = getTotalPages()
  totalElements.value = getAllCandidates().length
})
</script>

<template>
  <div
    :class="
      props.isRecruitmentContainerCollapse
        ? 'recruiment-app-content-container-collapse'
        : 'recruiment-app-content-container-expand'
    "
    id="recruiment-app-content-container"
  >
    <div class="app-candidates">
      <div class="app-candidates-layout d-flex dis-flex-grow dis-flex-row">
        <div class="list-candidate-center d-flex dis-flex-grow dis-flex-column">
          <div class="title-header">
            <div class="title-left">Ứng viên</div>
            <div class="title-right d-flex">
              <button
                @click="openAddCandidateModal"
                type="button"
                class="btn btn-primary item-head-left"
              >
                <div class="icon-add"></div>
                <span class="title-name pl-2">Thêm ứng viên</span>
              </button>
              <div class="more-insert-option d-flex justify-content-center align-items-center">
                <div class="btn-dropdown">
                  <div class="toggle-down">
                    <div class="icon-down"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="candidates-wrapper">
            <div class="candidates-wrapper-content d-flex flex-col">
              <!-- Table  -->
              <MsTable
                :totalPages="paginationState.totalPages"
                :pageSize="paginationState.pageSize"
                :currentPage="paginationState.currentPage"
                :totalElements="totalElements"
                :nextPage="nextPageCandidate"
                :previousPage="previousPageCandidate"
                :changePageSize="changePageSizeFunc"
                :isDisplayToolbar="true"
                :tableHeader="candidateTableHead"
                :tableBody="candidateTableBody"
                v-model="keywordSearch"
                @openUpdateCandidateModal="openUpdateCandidateModal"
              >
              </MsTable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CandidateModal
      v-model:isSaved="isSaved"
      :isAdd="isAdd"
      :isModalOpen="isModalOpen"
      @close="closeCandidateModal"
      :candidateUpdate="candidateUpdate"
    />
  </div>
</template>

<style scoped></style>
