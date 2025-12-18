<script setup></script>

<template>
  <div>
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
              <input
                id="fullname-update"
                class="field-input"
                type="text"
                maxlength="255"
                placeholder="Nhập họ và tên"
              />
              <div class="error-message" id="fullname-update-error-message"></div>
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
                    onclick="openDateTimeModal('update')"
                  >
                    <b class="dropdown-text m-r-8" id="dropdown-text-datetime-update">
                      Ngày tháng năm
                    </b>
                    <div class="dropdown-icon"></div>
                    <!-- dropdown datetime here -->
                    <div
                      id="display-datetime-modal-update"
                      class="datetime-dropdown datetime-dropdown-hide"
                    >
                      <div
                        class="dropdown-item d-flex align-items-center"
                        id="choosed-year"
                        onclick="changeInputDateType(this, 'update')"
                      >
                        <div>Năm</div>
                      </div>
                      <div
                        class="dropdown-item d-flex align-items-center"
                        id="choosed-month-year"
                        onclick="changeInputDateType(this, 'update')"
                      >
                        <div>Tháng năm</div>
                      </div>
                      <div
                        class="dropdown-item d-flex align-items-center"
                        id="choosed-day-month-year"
                        onclick="changeInputDateType(this, 'update')"
                      >
                        <div>Ngày tháng năm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field-container d-flex align-items-center">
                <input
                  oninput="formatInputTypeOnInput(this, 'update')"
                  onblur="formatInputTypeOnBlur(this, 'update')"
                  type="text"
                  maxlength="10"
                  role="combobox"
                  spellcheck="false"
                  aria-haspopup="true"
                  autocomplete="off"
                  id="birthdate-update"
                  placeholder="dd/MM/yyyy"
                  class="datetime-input"
                />
                <div id="calendar" class="calendar-setting pointer">
                  <div class="icon-calendar-vertical"></div>
                </div>
                <input type="date" id="realDate-update" hidden />
              </div>
              <div class="error-message" id="birthdate-update-error-message"></div>
            </div>
            <div class="dup-row">
              <div class="label-input">Giới tính</div>
              <div class="field-container">
                <select
                  class="field-input"
                  type="text"
                  placeholder="Chọn giới tính"
                  id="gender-update"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </select>
                <div class="error-message" id="gender-error-message"></div>
              </div>
            </div>
          </div>
          <!-- Ngày sinh, giới tính End -->
          <!-- Ngày ứng tuyển và Nguồn ứng viên Start -->
          <div class="input-dup">
            <div class="dup-row">
              <div class="label-input">Nguồn ứng viên</div>
              <div class="field-container">
                <select class="field-input" type="text" id="candidate-resource-update">
                  <option value="">Chọn nguồn ứng viên</option>
                  <option value="Group tuyển dụng">Group tuyển dụng</option>
                  <option value="Hội chợ việc làm">Hội chợ việc làm</option>
                  <option value="Website">Website</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Zalo">Zalo</option>
                  <option value="CareerViet">CareerViet</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Careerlink">Careerlink</option>
                </select>
                <div class="error-message" id="candidate-resource-error-message"></div>
              </div>
            </div>
            <div class="dup-row">
              <div class="label-input d-flex justify-content-between">
                <div>Ngày ứng tuyển</div>
              </div>

              <div class="field-container d-flex align-items-center">
                <input
                  oninput="formatInputTypeOnInputDayMonthYear(this)"
                  onblur="formatInputTypeOnBlurDayMonthYear(this)"
                  type="text"
                  maxlength="10"
                  role="combobox"
                  spellcheck="false"
                  aria-haspopup="true"
                  class="field-input datetime-input"
                  autocomplete="off"
                  id="created-at-update"
                  placeholder="dd/MM/yyyy"
                />
                <div id="calendar" class="calendar-setting pointer">
                  <div class="icon-calendar-vertical"></div>
                </div>
                <input type="date" id="realDate" hidden />
              </div>
              <div class="error-message" id="created-at-error-message"></div>
            </div>
          </div>
          <!-- Ngày ứng tuyển và Nguồn ứng viên End -->
          <div class="input-area">
            <div class="label-input">Khu vực</div>
            <div class="field-container d-flex align-items-center">
              <select id="region-update" class="field-input" placeholder="Khu vực">
                <option value="">Chọn khu vực</option>
                <option value="Cầu Giấy">Cầu Giấy</option>
                <option value="Tây Hồ">Tây Hồ</option>
                <option value="Thanh Xuân">Thanh Xuân</option>
                <option value="Gia Lâm">Gia Lâm</option>
                <option value="Bắc Từ Liêm">Bắc Từ Liêm</option>
              </select>
              <div class="dictionary-setting pointer">
                <div class="icon-more-vertical"></div>
              </div>
            </div>
            <div class="error-message" id="region-error-message"></div>
          </div>
          <!-- Nhân sự khai thác và Cộng tác viên Start -->
          <div class="label-input d-flex justify-content-between">
            <div>Nhân sự khai thác</div>
          </div>
          <div class="field-container">
            <select class="field-input" type="text" id="human-resource-update">
              <option value="">Chọn nhân sự khai thác</option>
              <option value="Dinh Nga QTHT">Dinh Nga QTHT</option>
              <option value="Lương Nguyễn">Lương Nguyễn</option>
              <option value="Nguyễn Lan Hương">Nguyễn Lan Hương</option>
              <option value="Nguyễn Văn Công">Nguyễn Văn Công</option>
              <option value="Nguyễn Thành Chung">Nguyễn Thành Chung</option>
            </select>
            <div class="error-message" id="human-resource-error-message"></div>
          </div>

          <div class="label-input">Cộng tác viên</div>
          <div class="field-container">
            <select class="field-input" type="text" id="partner-update">
              <option value="">Chọn cộng tác viên</option>
              <option value="Tuyển dụng Misa">Tuyển dụng Misa</option>
            </select>
            <div class="error-message" id="partner-error-message"></div>
          </div>
          <div class="d-flex align-items-center pointer mb-2">
            <div class="icon-plus"></div>
            <div class="text-active add-new-context">Thêm người giới thiệu</div>
          </div>
          <!-- Nhân sự khai thác và Cộng tác viên End -->
        </div>
      </div>
    </div>
    <div class="candidate-info">
      <div class="title-candidate-info">THÔNG TIN LIÊN HỆ</div>
      <!-- SĐT, Email Start -->
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-phone"></div>
          <div class="contact-field">Số điện thoại</div>
        </div>

        <div class="field-container">
          <input type="text" class="field-input" id="phone-update" />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="phone-update-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="d-flex align-items-center pointer mb-2">
          <div class="icon-plus"></div>
          <div class="text-active add-new-context">Thêm số điện thoại</div>
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-email"></div>
          <div class="contact-field">Email</div>
        </div>
        <div class="field-container">
          <input class="field-input" type="email" id="email-update" />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="email-update-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="d-flex align-items-center pointer mb-2">
          <div class="icon-plus"></div>
          <div class="text-active add-new-context">Thêm email</div>
        </div>
      </div>
      <!-- SĐT, Email End -->
      <div class="input-address row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-location"></div>
          <div class="contact-field">Địa chỉ</div>
        </div>
        <div class="field-container">
          <input type="text" class="field-input" id="address-update" />
        </div>
      </div>
      <div class="input-address row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="address-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-skype"></div>
          <div class="contact-field">Skype</div>
        </div>
        <div class="field-container d-flex gap3">
          <input type="text" placeholder="Tên hiển thị" class="field-input" id="skype-name" />
          <input type="text" class="field-input" id="skype-id" placeholder="live:" />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="skype-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-facebook"></div>
          <div class="contact-field">Facebook</div>
        </div>
        <div class="field-container">
          <input type="text" class="field-input" id="link-facebook" />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="facebook-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-zalo"></div>
          <div class="contact-field">Zalo</div>
        </div>
        <div class="field-container">
          <input type="text" class="field-input" id="link-zalo" />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="zalo-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-link"></div>
          <div class="contact-field">Liên kết khác</div>
        </div>
        <div class="field-container">
          <input type="text" class="field-input" id="other-link" />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="other-link-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="d-flex align-items-center pointer mb-2">
          <div class="icon-plus"></div>
          <div class="text-active add-new-context">Thêm đường dẫn</div>
        </div>
      </div>
      <!-- Học vấn Start -->
      <div class="input-college">
        <div class="label-input title-candidate-info">HỌC VẤN</div>
        <div id="education-input-cluster">
          <div class="education-info d-flex">
            <div class="row-input">
              <div class="label-input d-flex align-items-center">
                <div class="icon-circle"></div>
                <div class="contact-field">Trình độ đào tạo</div>
              </div>
              <div class="field-container d-flex pos-relative align-items-center">
                <input
                  id="level-update"
                  type="text"
                  class="field-input"
                  maxlength="255"
                  placeholder="Nhập trình độ đào tạo"
                />
                <span class="icon-plus plus-input"></span>
                <div class="arrow-setting pointer">
                  <div class="icon-arrow-down"></div>
                </div>
                <span class="icon-sub sub-input sub-input-hide" onclick="removeEducation(e)"></span>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="label-input d-flex align-items-center">
                <div class="label-input"></div>
              </div>
              <div class="error-message" id="level-error-message"></div>
            </div>
            <div class="row-input">
              <div class="label-input d-flex align-items-center">
                <div class="icon-circle"></div>
                <div class="contact-field">Nơi đào tạo</div>
              </div>
              <div class="field-container d-flex pos-relative align-items-center">
                <input
                  id="location-update"
                  class="field-input"
                  type="text"
                  maxlength="255"
                  placeholder="Nhập nơi đào tạo"
                />
                <span class="icon-plus plus-input"></span>
                <div class="arrow-setting pointer">
                  <div class="icon-arrow-down"></div>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="label-input d-flex align-items-center">
                <div class="label-input"></div>
              </div>
              <div class="error-message" id="location-error-message"></div>
            </div>
            <div class="row-input">
              <div class="label-input d-flex pos-relative align-items-center">
                <div class="icon-circle"></div>
                <div class="contact-field">Chuyên ngành</div>
              </div>
              <div class="field-container d-flex pos-relative align-items-center">
                <input
                  id="major-update"
                  class="field-input"
                  type="text"
                  maxlength="255"
                  placeholder="Nhập chuyên ngành"
                />
                <span class="icon-plus plus-input"></span>
                <div class="arrow-setting pointer">
                  <div class="icon-arrow-down"></div>
                </div>
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
      <div class="d-flex align-items-center pointer mb-2">
        <div class="icon-plus"></div>
        <div class="add-new-context">Thêm học vấn</div>
      </div>
      <!-- Học vấn End -->

      <div class="label-input title-candidate-info">KINH NGHIỆM LÀM VIỆC</div>
      <!-- Nơi làm việc gần đây start -->
      <div class="input-recent-workplace row-input mb-5">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Nơi làm việc gần đây</div>
        </div>
        <div class="field-container">
          <input
            class="field-input"
            type="text"
            maxlength="255"
            placeholder="Nhập nơi làm việc gần đây"
            id="recent-workplace-update"
          />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input"></div>
        <div class="d-flex align-items-center pointer mb-2">
          <div class="icon-plus"></div>
          <div class="add-new-context">Thêm kinh nghiệm làm việc</div>
        </div>
      </div>
      <!-- Nơi làm việc gần đây end -->

      <!-- Nơi làm việc start -->
      <div class="input-workplace row-input mb-5">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Nơi làm việc</div>
        </div>
        <div class="field-container">
          <input
            class="field-input"
            type="text"
            maxlength="255"
            placeholder="Nhập nơi làm việc"
            id="workplace-update"
          />
        </div>
      </div>
      <!-- Nơi làm việc end -->
      <!-- Thời gian start -->
      <div class="row-input mb-5">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Thời gian</div>
        </div>
        <div class="d-flex align-items-center gap3">
          <div class="field-container d-flex align-items-center">
            <input
              oninput="formatInputTypeOnInputMonthYear(this)"
              onblur="formatInputTypeOnBlurMonthYear(this)"
              type="text"
              maxlength="10"
              role="combobox"
              spellcheck="false"
              aria-haspopup="true"
              class="field-input datetime-input"
              autocomplete="off"
              id="time-from-update"
              placeholder="MM/yyyy"
            />
            <div id="calendar" class="calendar-setting pointer">
              <div class="icon-calendar-vertical"></div>
            </div>
            <input type="date" id="realDate" hidden />
          </div>
          <div class="d-flex align-items-center fs-20">-</div>

          <div class="field-container d-flex align-items-center">
            <input
              oninput="formatInputTypeOnInputMonthYear(this)"
              onblur="formatInputTypeOnBlurMonthYear(this)"
              type="text"
              maxlength="10"
              role="combobox"
              spellcheck="false"
              aria-haspopup="true"
              class="field-input datetime-input"
              autocomplete="off"
              id="time-to-update"
              placeholder="MM/yyyy"
            />
            <div id="calendar" class="calendar-setting pointer">
              <div class="icon-calendar-vertical"></div>
            </div>
            <input type="date" id="realDate" hidden />
          </div>
        </div>
      </div>

      <!-- Thời gian end -->
      <!-- Vị trí công việc start -->
      <div class="input-workplace row-input mb-5">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Vị trí công việc</div>
        </div>
        <div class="field-container">
          <input
            class="field-input"
            type="text"
            maxlength="255"
            placeholder="Nhập vị trí công việc"
            id="position-update"
          />
        </div>
      </div>
      <!-- Vị trí công việc end -->
      <!--Mô tả công việc start -->
      <div class="input-workplace row-input">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Mô tả công việc</div>
        </div>
        <div class="field-container">
          <textarea
            id="job-description-update"
            type="text"
            placeholder="Nhập mô tả công việc"
            oninput="autoHeight(this)"
          ></textarea>
          <div class="error-message" id="job-description-error-message"></div>
        </div>
      </div>
      <!-- Mô tả công việc end -->
      <div class="label-input title-candidate-info">TRƯỜNG TÙY CHỈNH</div>
      <div class="row-input">
        <div class="label-input"></div>
        <div class="d-flex align-items-center pointer">
          <div class="icon-plus"></div>
          <div class="add-new-context">Thêm trường tùy chỉnh</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
