# Vue 3 + Vite Project

Dự án phát triển frontend sử dụng Vue 3 và Vite, áp dụng các phương pháp thực hành tốt nhất với kiến trúc component rõ ràng và dễ mở rộng.

## Bắt Đầu

### Cài đặt các gói phụ thuộc

```bash
npm install
```

### Chạy dự án ở chế độ phát triển

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## Cấu Trúc Dự Án

```
.
├── public/                  # Tài nguyên tĩnh
├── src/
│   ├── assets/
│   │   ├── icons/          # Icon assets
│   │   ├── json/           # JSON data files
│   │   │   └── candidates.json
│   │   └── styles/         # CSS files
│   │       ├── base/       # Base styles
│   │       ├── components/ # Component styles
│   │       └── pages/      # Page styles
│   ├── components/         # Vue components
│   │   ├── controller/
│   │   │   ├── ms-button/  # Button component
│   │   │   ├── ms-input/   # Input component
│   │   │   ├── ms-popup/   # Popup component
│   │   │   └── ms-table/   # Table component
│   │   └── toast/          # Toast notification
│   ├── enums/              # Enum definitions
│   ├── hooks/              # Custom hooks
│   ├── layout/             # Layout components
│   ├── router/             # Vue Router configuration
│   ├── services/           # API services
│   ├── stores/             # State management
│   ├── utils/              # Utility functions
│   ├── views/              # Page components
│   ├── App.vue             # Root component
│   └── main.js             # Application entry point
├── vite.config.js          # Vite configuration
├── jsconfig.json           # JavaScript configuration
├── eslint.config.js        # ESLint configuration
├── package.json            # Project dependencies
└── index.html              # HTML template
```

## Quy Tắc Đặt Tên

### Tên Thư Mục

- Viết chữ thường
- Các từ cách nhau bằng dấu gạch ngang (-)
- Tên phải mô tả rõ chức năng

Ví dụ: `ms-button`, `ms-table`, `controller`

### Tên File

**Vue Components:**

- Sử dụng PascalCase
- Đuôi `.vue`

Ví dụ: `MsButton.vue`, `MsTable.vue`, `Counter.vue`

**File JavaScript:**

- Sử dụng camelCase
- Đuôi `.js`

Ví dụ: `candidateService.js`, `customHook.js`

**File CSS:**

- Viết chữ thường
- Sử dụng dấu gạch ngang (-)
- Đuôi `.css`

Ví dụ: `component-styles.css`, `page-layout.css`

## Kiểm Soát Phiên Bản (.gitignore)

File `.gitignore` loại trừ:

- `node_modules/`
- `dist/`, `dist-ssr/`
- `*.local`
- `logs/`, `*.log`
- `.vscode/`, `.idea/`, `.DS_Store`

## Tính Năng Chính

- Vue 3 Composition API với `<script setup>`
- Phát triển nhanh với Vite
- Kiến trúc dựa trên components
- Component Button tùy chỉnh (MsButton)
- Component Table tùy chỉnh (MsTable)
- Quản lý state với Pinia
- Định tuyến với Vue Router
- CSS cơ bản, dễ mở rộng

## Các Lệnh Có Sẵn

| Lệnh              | Mô tả                          |
| ----------------- | ------------------------------ |
| `npm run dev`     | Khởi động máy chủ phát triển   |
| `npm run build`   | Build ứng dụng cho production  |
| `npm run preview` | Xem trước bản build production |

## Tài Liệu & Công Cụ

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue SFC `<script setup>`](https://vuejs.org/api/sfc-script-setup.html)
- [VS Code + Volar Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## License

Dự án này được phát triển cho mục đích **học tập tại MISA**.
