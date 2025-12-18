<script setup>
import CommonEnums from '@/enums/commons'
import { formatDate, formatNumber, formatText } from '@/utils/formatter'
import { computed } from 'vue'

// Model từ khóa tìm kiếm
const keywordSearch = defineModel()
// Props từ MsTable
const props = defineProps({
  totalPages: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  totalElements: {
    type: Number,
    default: 0,
  },
  nextPage: {
    type: Function,
    default: null,
  },
  previousPage: {
    type: Function,
    default: null,
  },
  isDisplayToolbar: {
    type: Boolean,
    default: false,
  },
  tableHeader: {
    type: Object,
    default: null,
  },
  tableBody: {
    type: Object,
    default: null,
  },
  changePageSize: {
    type: Function,
    default: null,
  },
})

const emits = defineEmits(['openUpdateCandidateModal'])
/**
 * Tạo avatar chữ cái đầu từ họ tên.
 * @param {string} fullname - Họ tên đầy đủ.
 * @returns {string} - Hai ký tự viết hoa đại diện.
 * Created By hanv 16/12/2025
 */
function autoGenerateAvatar(fullname) {
  const names = fullname.trim().split(' ')

  let avatar = ''
  if (names.length === 1) {
    avatar = names[0].charAt(0).toUpperCase()
  } else {
    avatar = names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase()
  }
  return avatar
}
/**
 * Sinh màu HSL ổn định từ chuỗi.
 * @param {string} str - Chuỗi đầu vào.
 * @returns {string} - Giá trị màu hsl().
 * Created By hanv 16/12/2025
 */
function stringToColor(str) {
  let hash = 0
  for (let index = 0; index < str.length; index++) {
    hash = str.charCodeAt(index) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 70%, 50%)`
}
/**
 * Sinh chuỗi icon sao theo xếp hạng.
 * @param {string} rate - Hạng A-F.
 * @returns {string} - HTML icon sao.
 * Created By hanv 16/12/2025
 */
function starIconGenerateByRate(rate) {
  let starIcons = ''
  const greyStarIcon = '<span class="icon-avatar-grey"></span>'
  const yellowStarIcon = '<span class="icon-avatar-yellow"></span>'
  switch (rate) {
    case 'A':
      starIcons = yellowStarIcon.repeat(5)
      break
    case 'B':
      starIcons = yellowStarIcon.repeat(4) + greyStarIcon
      break
    case 'C':
      starIcons = yellowStarIcon.repeat(3) + greyStarIcon.repeat(2)
      break
    case 'D':
      starIcons = yellowStarIcon.repeat(2) + greyStarIcon.repeat(3)
      break
    case 'E':
      starIcons = yellowStarIcon + greyStarIcon.repeat(4)
      break
    case 'F':
      starIcons = greyStarIcon.repeat(5)
      break
    default:
      starIcons = greyStarIcon.repeat(5)
  }
  return starIcons
}
// Disable nút chuyển trang
const isDisabledPreviousPage = computed(() => {
  return props.currentPage <= 0
})
const isDisabledNextPage = computed(() => {
  return props.currentPage >= props.totalPages - 1
})
</script>

<template>
  <div class="candidate-wrapper-content-grid">
    <!-- ==================== TOOLBAR SECTION ==================== -->
    <div v-show="isDisplayToolbar" class="toolbar-grid bg-white">
      <div class="toolbar-container d-flex align-items-center justify-content-between">
        <div id="toolbar-grid" class="toolbar-grid-default">
          <div class="toolbar-grid-left">
            <div class="search-grid d-flex">
              <div class="search-ontab">
                <div class="texteditor-container">
                  <div class="button-container">
                    <div class="ai-search">
                      <div class="button-content">
                        <i class="search"></i>
                      </div>
                    </div>
                  </div>
                  <div class="input-container">
                    <input
                      class="text-editor-input"
                      type="search"
                      placeholder="Tìm kiếm hoặc nhờ AI trợ giúp"
                      autocomplete="off"
                      v-model="keywordSearch"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="toolbar-grid-right">
            <div class="filter-area wrap-icon-button-toolbar m-r-8" title="Bộ lọc">
              <div class="icon-filter ic-svg"></div>
            </div>
            <div class="wrap-icon-button-toolbar m-r-8" title="Xuất khẩu">
              <div class="icon-export ic-svg"></div>
            </div>
            <div class="wrap-icon-button-toolbar m-r-8" title="Xem nhanh hoạt động">
              <div class="icon-interactive-history ic-svg"></div>
            </div>
            <div class="z-index-default dropdown">
              <div class="wrap-icon-button-setting">
                <div class="icon-setting ic-svg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ==================== END TOOLBAR SECTION ==================== -->
    <div class="table-candidate">
      <div class="table-wrap">
        <table class="candidates-table">
          <thead>
            <tr>
              <th class="col-checkbox" id="select-all">
                <input
                  type="checkbox"
                  id="select-all-input"
                  aria-label="select all"
                  onchange="checkboxSelectAllCandidateToggle(this)"
                />
              </th>
              <th v-for="(item, index) in tableHeader" :key="index">
                {{ item.label }}
              </th>
              <th class="col-action"></th>
            </tr>
          </thead>
          <tbody id="candidate-table-body">
            <tr :id="`candidate-${item.id}`" v-for="(item, index) in tableBody" :key="index">
              <td>
                <input
                  type="checkbox"
                  class="row-checkbox"
                  onchange="changeToolbarCandidateWrapperWhenCheckboxChecked()"
                />
              </td>
              <td v-for="(itemInner, indexInner) in tableHeader" :key="itemInner.value">
                <template v-if="itemInner.type == CommonEnums.typeInput.custom">
                  <span
                    class="avatar avatar-blue"
                    :style="`background-color: ${stringToColor(autoGenerateAvatar(item[itemInner.value]))}`"
                    >{{ autoGenerateAvatar(item[itemInner.value]) }}</span
                  >
                  <div class="name-block">
                    <div class="name">
                      {{ item[itemInner.value] ? item[itemInner.value] : '--' }}
                    </div>
                    <div class="sub">--</div>
                  </div>
                </template>
                <template v-else-if="itemInner.type == CommonEnums.typeInput.date">
                  {{ formatDate(item[itemInner.value]) }}
                </template>
                <template v-else-if="itemInner.type == CommonEnums.typeInput.number">
                  {{ formatNumber(item[itemInner.value]) }}
                </template>
                <template v-else-if="itemInner.value == 'rate'">
                  <span v-html="starIconGenerateByRate(item.rate)"></span>
                </template>
                <template v-else>
                  {{ formatText(item[itemInner.value]) }}
                </template>
              </td>
              <td class="col-action">
                <span class="icon-edit" @click="$emit('openUpdateCandidateModal', item.id)"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        <div class="total">
          Tổng: <strong id="total-candidates">{{ totalElements }}</strong> bản ghi
        </div>
        <div class="pagination-area">
          <label class="per-page"
            >Số bản ghi/trang
            <select id="per-page-selection" @change="changePageSize($event.target.value)">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </label>
          <div class="page-info">1 - {{ pageSize }} bản ghi</div>
          <div
            id="previous-page"
            @click="previousPage"
            :class="['icon-l', 'pointer', { disabled: isDisabledPreviousPage }]"
          ></div>
          <div
            id="next-page"
            @click="nextPage"
            :class="['icon-r', 'pointer', { disabled: isDisabledNextPage }]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
