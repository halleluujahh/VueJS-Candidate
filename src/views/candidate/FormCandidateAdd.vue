<script setup>
import MsInput from '@/components/controller/ms-input/MsInput.vue'
import CommonEnums from '@/enums/commons'
import { dateTimeText } from '@/utils/constants'
import * as formatter from '@/utils/formatter.js'
import { ref } from 'vue'

const fullnameInput = defineModel('fullnameInput', { default: '' })
const birthdateInput = defineModel('birthdateInput', { default: '' })
const genderSelect = defineModel('genderSelect', { default: '' })
const regionSelect = defineModel('regionSelect', { default: '' })
const phoneInput = defineModel('phoneInput', { default: '' })
const emailInput = defineModel('emailInput', { default: '' })
const addressInput = defineModel('addressInput', { default: '' })
const levelSelect = defineModel('levelSelect', { default: '' })
const locationSelect = defineModel('locationSelect', { default: '' })
const majorSelect = defineModel('majorSelect', { default: '' })
const createdAtInput = defineModel('createdAtInput', { default: '' })
const humanResourceSelect = defineModel('humanResourceSelect', { default: '' })
const candidateResourceSelect = defineModel('candidateResourceSelect', { default: '' })
const partnerSelect = defineModel('partnerSelect', { default: '' })
const recentWorkplaceInput = defineModel('recentWorkplaceInput', { default: '' })
const workplaceInput = defineModel('workplaceInput', { default: '' })
const timeFromWorkplaceInput = defineModel('timeFromWorkplaceInput', { default: '' })
const timeToWorkplaceInput = defineModel('timeToWorkplaceInput', { default: '' })
const positionInput = defineModel('positionInput', { default: '' })
const jobDescriptionInput = defineModel('jobDescriptionInput', { default: '' })

const fullnameError = defineModel('fullnameError', { default: '' })
const birthdateError = defineModel('birthdateError', { default: '' })
const phoneError = defineModel('phoneError', { default: '' })
const emailError = defineModel('emailError', { default: '' })
const timeToError = defineModel('timeToError', { default: '' })

const dateTimePlaceholders = defineModel('dateTimePlaceholders', {
  default: dateTimeText.datemonthyear,
})

const dateTimeTextDisplay = ref(dateTimeText.ddMMyyyy)
const isOpenDateTimeModal = ref(false)

function toggleDisplayDatetimeDropdown() {
  isOpenDateTimeModal.value = !isOpenDateTimeModal.value
}
function changeInputDateType(type) {
  if (type === 'year') {
    dateTimePlaceholders.value = dateTimeText.year
    dateTimeTextDisplay.value = dateTimeText.yyyy
  }
  if (type === 'month-year') {
    dateTimePlaceholders.value = dateTimeText.monthyear
    dateTimeTextDisplay.value = dateTimeText.MMyyyy
  }
  if (type === 'day-month-year') {
    dateTimePlaceholders.value = dateTimeText.datemonthyear
    dateTimeTextDisplay.value = dateTimeText.ddMMyyyy
  }
}
</script>

<template>
  <div>
    <div class="file-import">
      <div class="wrap-file">
        <div class="file-info">
          <div class="file-msg">Kéo thả hoặc bấm vào đây để tải CV lên</div>
          <div class="file-msg2">
            Chấp nhận file .doc, .docx, .pdf, .jpg, .jpeg, .png
            <span> (Dung lượng < hơn 15 Mb) </span>
          </div>
        </div>
      </div>
      <input id="file-input" type="file" accept=".docx, .pdf, .doc, .jpg, .jpeg, .png" />
    </div>
    <div class="info-candidate">
      <div class="avatar-candidate">
        <div class="avatar-modal">
          <div class="show-image">
            <span class="image">Ảnh</span>
          </div>
          <input type="file" accept="image/*" hidden />
        </div>
      </div>
      <div class="input-info">
        <div class="right-content">
          <!-- Họ tên Start -->
          <div class="input-fullname">
            <div class="label-input">Họ và tên <span class="color-red">*</span></div>
            <div class="field-container">
              <MsInput
                v-model="fullnameInput"
                :id="'fullname'"
                :class="'field-input'"
                :type="'text'"
                :maxlength="255"
                :placeholder="'Nhập họ và tên'"
                :formType="CommonEnums.typeFormElement.INPUT"
              />
              <div
                :class="[
                  'error-message',
                  {
                    'input-error': fullnameError !== '',
                  },
                ]"
                id="fullname-error-message"
              >
                {{ fullnameError }}
              </div>
            </div>
          </div>
          <!-- Họ tên End -->
          <!-- Ngày sinh, giới tính Start -->
          <div class="input-dup">
            <div class="dup-row">
              <div class="label-input d-flex justify-content-between">
                <div>Ngày sinh</div>
                <div class="format-date dis-align-self-center">
                  <div
                    class="dropdown-toggle pointer d-flex align-items-center"
                    @click="toggleDisplayDatetimeDropdown"
                  >
                    <b class="dropdown-text m-r-8" id="dropdown-text-datetime">
                      {{ dateTimeTextDisplay }}
                    </b>
                    <div class="dropdown-icon"></div>
                    <!-- dropdown datetime here -->
                    <div
                      id="display-datetime-modal"
                      :class="[
                        'datetime-dropdown',
                        {
                          'datetime-dropdown-show': isOpenDateTimeModal,
                          'datetime-dropdown-hide': !isOpenDateTimeModal,
                        },
                      ]"
                    >
                      <div
                        class="dropdown-item d-flex align-items-center"
                        id="choosed-year"
                        @click="changeInputDateType('year')"
                      >
                        <div>Năm</div>
                      </div>
                      <div
                        class="dropdown-item d-flex align-items-center"
                        id="choosed-month-year"
                        @click="changeInputDateType('month-year')"
                      >
                        <div>Tháng năm</div>
                      </div>
                      <div
                        class="dropdown-item d-flex align-items-center"
                        id="choosed-day-month-year"
                        @click="changeInputDateType('day-month-year')"
                      >
                        <div>Ngày tháng năm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field-container d-flex align-items-center">
                <MsInput
                  v-model="birthdateInput"
                  :id="'birthdate'"
                  :class="'datetime-input'"
                  :type="'text'"
                  :placeholder="dateTimePlaceholders"
                  :formType="CommonEnums.typeFormElement.DATEPICKER"
                  :autocomplete="'off'"
                />
                <div id="calendar" class="calendar-setting pointer">
                  <div class="icon-calendar-vertical"></div>
                </div>
                <input type="date" id="realDate" hidden />
              </div>
              <div
                :class="[
                  'error-message',
                  {
                    'input-error': birthdateError !== '',
                  },
                ]"
                id="birthdate-error-message"
              >
                {{ birthdateError }}
              </div>
            </div>
            <div class="dup-row">
              <div class="label-input">Giới tính</div>
              <div class="field-container">
                <MsInput
                  v-model="genderSelect"
                  :id="'gender'"
                  :formType="CommonEnums.typeFormElement.SELECT"
                  :class="'field-input'"
                  :options="[
                    {
                      label: 'Chọn giới tính',
                      value: '',
                    },
                    {
                      label: 'Nam',
                      value: 'Male',
                    },
                    {
                      label: 'Nữ',
                      value: 'Female',
                    },
                  ]"
                />
                <div class="error-message" id="gender-error-message"></div>
              </div>
            </div>
          </div>
          <!-- Ngày sinh, giới tính End -->
          <div class="input-area">
            <div class="label-input">Khu vực</div>
            <div class="field-container d-flex align-items-center">
              <MsInput
                v-model="regionSelect"
                :id="'region'"
                :class="'field-input'"
                :placeholder="'Khu vực'"
                :formType="CommonEnums.typeFormElement.SELECT"
                :options="[
                  {
                    label: 'Chọn khu vực',
                    value: '',
                  },
                  {
                    label: 'Cầu Giấy',
                    value: 'Cầu Giấy',
                  },
                  {
                    label: 'Tây Hồ',
                    value: 'Tây Hồ',
                  },
                  {
                    label: 'Thanh Xuân',
                    value: 'Thanh Xuân',
                  },
                  {
                    label: 'Gia Lâm',
                    value: 'Gia Lâm',
                  },
                  {
                    label: 'Bắc Từ Liêm',
                    value: 'Bắc Từ Liêm',
                  },
                ]"
              />
              <div class="dictionary-setting pointer">
                <div class="icon-more-vertical"></div>
              </div>
            </div>
            <div class="error-message" id="region-error-message"></div>
          </div>
          <!-- SĐT, Email Start -->
          <div class="input-dup">
            <div class="dup-row">
              <div class="label-input d-flex justify-content-between">
                <div>Số điện thoại</div>
              </div>

              <div class="field-container">
                <MsInput
                  v-model="phoneInput"
                  :id="'phone'"
                  :placeholder="'Nhập số điện thoại'"
                  :class="'field-input'"
                  :type="'text'"
                  :formType="CommonEnums.typeFormElement.INPUT"
                />
                <div
                  :class="[
                    'error-message',
                    {
                      'input-error': phoneError !== '',
                    },
                  ]"
                  id="phone-error-message"
                >
                  {{ phoneError }}
                </div>
              </div>
            </div>
            <div class="dup-row">
              <div class="label-input">Email</div>
              <div class="field-container">
                <MsInput
                  v-model="emailInput"
                  :id="'email'"
                  :placeholder="'Nhập email'"
                  :class="'field-input'"
                  :type="'email'"
                  :formType="CommonEnums.typeFormElement.INPUT"
                />
                <div
                  :class="[
                    'error-message',
                    {
                      'input-error': emailError !== '',
                    },
                  ]"
                  id="email-error-message"
                >
                  {{ emailError }}
                </div>
              </div>
            </div>
          </div>
          <!-- SĐT, Email End -->
          <div class="input-address">
            <div class="label-input">Địa chỉ</div>
            <div class="field-container">
              <MsInput
                v-model="addressInput"
                :id="'address'"
                :type="'text'"
                :class="'field-input'"
                :placeholder="'Nhập địa chỉ'"
                :formType="CommonEnums.typeFormElement.INPUT"
              />
              <div class="error-message" id="address-error-message"></div>
            </div>
          </div>
          <!-- Học vấn Start -->
          <div class="input-college">
            <div class="label-input">Học vấn</div>
            <div id="education-input-cluster">
              <div class="education-info d-flex">
                <div class="d-flex justify-content-between align-items-center education-info-item">
                  <div class="label-input d-flex align-items-center">
                    <div class="icon-dot"></div>
                    <div class="label-input">Trình độ đào tạo</div>
                  </div>
                  <MsInput
                    v-model="levelSelect"
                    :id="'level'"
                    :class="'field-input'"
                    :type="'text'"
                    :maxlength="255"
                    :placeholder="'Nhập trình độ đào tạo'"
                    :formType="CommonEnums.typeFormElement.INPUT"
                  />
                  <span class="icon-plus plus-input"></span>
                  <div class="arrow-setting pointer">
                    <div class="icon-arrow-down"></div>
                  </div>
                  <span
                    class="icon-sub sub-input sub-input-hide"
                    onclick="removeEducation(e)"
                  ></span>
                </div>
                <div class="d-flex align-items-center">
                  <div class="label-input d-flex align-items-center">
                    <div class="label-input"></div>
                  </div>
                  <div class="error-message" id="level-error-message"></div>
                </div>
                <div class="d-flex justify-content-between align-items-center education-info-item">
                  <div class="label-input d-flex align-items-center">
                    <div class="icon-dot"></div>
                    <div class="label-input">Nơi đào tạo</div>
                  </div>
                  <MsInput
                    v-model="locationSelect"
                    :id="'location'"
                    :class="'field-input'"
                    :type="'text'"
                    :maxlength="255"
                    :placeholder="'Nhập nơi đào tạo'"
                    :formType="CommonEnums.typeFormElement.INPUT"
                  />
                  <span class="icon-plus plus-input"></span>
                  <div class="arrow-setting pointer">
                    <div class="icon-arrow-down"></div>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="label-input d-flex align-items-center">
                    <div class="label-input"></div>
                  </div>
                  <div class="error-message" id="location-error-message"></div>
                </div>
                <div class="d-flex justify-content-between align-items-center education-info-item">
                  <div class="label-input d-flex align-items-center">
                    <div class="icon-dot"></div>
                    <div class="label-input">Chuyên ngành</div>
                  </div>
                  <MsInput
                    v-model="majorSelect"
                    :id="'major'"
                    :class="'field-input'"
                    :type="'text'"
                    :maxlength="255"
                    :placeholder="'Nhập chuyên ngành'"
                    :formType="CommonEnums.typeFormElement.INPUT"
                  />
                  <span class="icon-plus plus-input"></span>
                  <div class="arrow-setting pointer">
                    <div class="icon-arrow-down"></div>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="label-input d-flex align-items-center">
                    <div class="label-input"></div>
                  </div>
                  <div class="error-message" id="major-error-message"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center pointer mb-2" onclick="addEducation()">
            <div class="icon-plus"></div>
            <div class="text-active icon-text">Thêm học vấn</div>
          </div>
          <!-- Học vấn End -->
          <!-- Ngày ứng tuyển và Nguồn ứng viên Start -->
          <div class="input-dup">
            <div class="dup-row">
              <div class="label-input d-flex justify-content-between">
                <div>Ngày ứng tuyển</div>
              </div>

              <div class="field-container d-flex align-items-center">
                <MsInput
                  v-model="createdAtInput"
                  :id="'created-at'"
                  :type="'text'"
                  :maxlength="10"
                  :autocomplete="'off'"
                  :placeholder="dateTimeText.datemonthyear"
                  :class="'field-input datetime-input'"
                  :formType="CommonEnums.typeFormElement.DATEPICKER"
                />
                <div id="calendar" class="calendar-setting pointer">
                  <div class="icon-calendar-vertical"></div>
                </div>
                <input type="date" id="realDate" hidden />
              </div>
              <div class="error-message" id="created-at-error-message"></div>
            </div>
            <div class="dup-row">
              <div class="label-input">Nguồn ứng viên</div>
              <div class="field-container">
                <MsInput
                  v-model="candidateResourceSelect"
                  :id="'candidate-resource'"
                  :class="'field-input'"
                  :formType="CommonEnums.typeFormElement.SELECT"
                  :options="[
                    {
                      label: 'Chọn nguồn ứng viên',
                      value: '',
                    },
                    {
                      label: 'Group tuyển dụng',
                      value: 'Group tuyển dụng',
                    },
                    {
                      label: 'Hội chợ việc làm',
                      value: 'Hội chợ việc làm',
                    },
                    {
                      label: 'Website',
                      value: 'Website',
                    },
                    {
                      label: 'Facebook',
                      value: 'Facebook',
                    },
                    {
                      label: 'Zalo',
                      value: 'Zalo',
                    },
                    {
                      label: 'CareerViet',
                      value: 'CareerViet',
                    },
                    {
                      label: 'LinkedIn',
                      value: 'LinkedIn',
                    },
                    {
                      label: 'Careerlink',
                      value: 'Careerlink',
                    },
                  ]"
                />
                <div class="error-message" id="candidate-resource-error-message"></div>
              </div>
            </div>
          </div>
          <!-- Ngày ứng tuyển và Nguồn ứng viên End -->
          <!-- Nhân sự khai thác và Cộng tác viên Start -->
          <div class="input-dup">
            <div class="dup-row">
              <div class="label-input d-flex justify-content-between">
                <div>Nhân sự khai thác</div>
              </div>

              <div class="field-container">
                <MsInput
                  v-model="humanResourceSelect"
                  :id="'human-resource'"
                  :class="'field-input'"
                  :formType="CommonEnums.typeFormElement.SELECT"
                  :options="[
                    {
                      label: 'Chọn nhân sự khai thác',
                      value: '',
                    },
                    {
                      label: 'Dinh Nga QTHT',
                      value: 'Dinh Nga QTHT',
                    },
                    {
                      label: 'Lương Nguyễn',
                      value: 'Lương Nguyễn',
                    },
                    {
                      label: 'Nguyễn Lan Hương',
                      value: 'Nguyễn Lan Hương',
                    },
                    {
                      label: 'Nguyễn Văn Công',
                      value: 'Nguyễn Văn Công',
                    },
                    {
                      label: 'Nguyễn Thành Chung',
                      value: 'Nguyễn Thành Chung',
                    },
                  ]"
                />
                <div class="error-message" id="human-resource-error-message"></div>
              </div>
            </div>
            <div class="dup-row">
              <div class="label-input">Cộng tác viên</div>
              <div class="field-container">
                <MsInput
                  v-model="partnerSelect"
                  :id="'partner'"
                  :class="'field-input'"
                  :formType="CommonEnums.typeFormElement.SELECT"
                  :options="[
                    {
                      label: 'Chọn cộng tác viên',
                      value: '',
                    },
                    {
                      label: 'Tuyển dụng Misa',
                      value: 'Tuyển dụng Misa',
                    },
                  ]"
                />
                <div class="error-message" id="partner-error-message"></div>
              </div>
            </div>
          </div>
          <!-- Nhân sự khai thác và Cộng tác viên End -->
          <div class="checkbox-indetermine d-flex align-items-center mb-2">
            <input type="checkbox" />
            <div class="icon-text">Thêm nhanh người tham chiếu vào kho ứng viên</div>
          </div>
          <div class="d-flex align-items-center pointer mb-2">
            <div class="icon-plus"></div>
            <div class="text-active icon-text">Thêm người giới thiệu</div>
          </div>
          <!-- Nơi làm việc gần đây start -->
          <div class="input-recent-workplace">
            <div class="label-input">Nơi làm việc gần đây</div>
            <div class="field-container">
              <MsInput
                v-model="recentWorkplaceInput"
                :id="'recent-workplace'"
                :class="'field-input'"
                :type="'text'"
                :maxlength="255"
                :placeholder="'Nhập nơi làm việc gần đây'"
                :formType="CommonEnums.typeFormElement.INPUT"
              />
              <div class="error-message" id="recent-workplace-error-message"></div>
            </div>
          </div>
          <!-- Nơi làm việc gần đây end -->
          <div class="d-flex align-items-center pointer mb-2">
            <div class="icon-plus"></div>
            <div class="text-active icon-text">Thêm kinh nghiệm làm việc</div>
          </div>
          <!-- Nơi làm việc start -->
          <div class="input-workplace">
            <div class="label-input">Nơi làm việc</div>
            <div class="field-container">
              <MsInput
                v-model="workplaceInput"
                :id="'workplace'"
                :class="'field-input'"
                :type="'text'"
                :maxlength="255"
                :placeholder="'Nhập nơi làm việc'"
                :formType="CommonEnums.typeFormElement.INPUT"
              />
              <div class="error-message" id="workplace-error-message"></div>
            </div>
          </div>
          <!-- Nơi làm việc end -->
          <!-- Thời gian start -->
          <div class="input-dup">
            <div class="dup-row">
              <div class="label-input d-flex justify-content-between">
                <div>Thời gian</div>
              </div>

              <div class="field-container d-flex align-items-center">
                <MsInput
                  v-model="timeFromWorkplaceInput"
                  :id="'time-from'"
                  :type="'text'"
                  :maxlength="10"
                  :autocomplete="'off'"
                  :placeholder="dateTimeText.monthyear"
                  :class="'field-input datetime-input'"
                  :formType="CommonEnums.typeFormElement.DATEPICKER"
                />
                <div id="calendar" class="calendar-setting pointer">
                  <div class="icon-calendar-vertical"></div>
                </div>
                <input type="date" id="realDate" hidden />
              </div>
              <div class="error-message" id="time-from-error-message"></div>
            </div>
            <div class="dup-row">
              <div class="label-input"></div>
              <div class="field-container d-flex align-items-center">
                <MsInput
                  v-model="timeToWorkplaceInput"
                  :id="'time-to'"
                  :type="'text'"
                  :maxlength="10"
                  :autocomplete="'off'"
                  :placeholder="dateTimeText.monthyear"
                  :class="'field-input datetime-input'"
                  :formType="CommonEnums.typeFormElement.DATEPICKER"
                />
                <div id="calendar" class="calendar-setting pointer">
                  <div class="icon-calendar-vertical"></div>
                </div>
                <input type="date" id="realDate" hidden />
              </div>
              <div
                :class="[
                  'error-message',
                  {
                    'input-error': timeToError !== '',
                  },
                ]"
                id="time-to-error-message"
              >
                {{ timeToError }}
              </div>
            </div>
          </div>
          <!-- Thời gian end -->
          <!-- Vị trí công việc start -->
          <div class="input-workplace">
            <div class="label-input">Vị trí công việc</div>
            <div class="field-container">
              <MsInput
                v-model="positionInput"
                :id="'position'"
                :type="'text'"
                :class="'field-input'"
                :maxlength="255"
                :placeholder="'Nhập vị trí công việc'"
                :formType="CommonEnums.typeFormElement.INPUT"
              />
              <div class="error-message" id="position-error-message"></div>
            </div>
          </div>
          <!-- Vị trí công việc end -->
          <!--Mô tả công việc start -->
          <div class="input-workplace">
            <div class="label-input">Mô tả công việc</div>
            <div class="field-container">
              <MsInput
                v-model="jobDescriptionInput"
                :id="'job-description'"
                :placeholder="'Nhập mô tả công việc'"
                :formType="CommonEnums.typeFormElement.TEXTAREA"
              />
              <div class="error-message" id="job-description-error-message"></div>
            </div>
          </div>
          <!-- Mô tả công việc end -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
