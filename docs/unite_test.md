# โครงสร้าง Unite test  ของโปรเจค


```bash

project
│
├── tsconfig.json
├── tsconfig.vitest.json
├── vitest.config.ts
│
├── src/
│
└── src/__tests__/

```

### แบ่งหน้าที่ชัดเจน

- tsconfig.json → สำหรับ Next.js
- tsconfig.vitest.json → สำหรับ Unit Test
- vitest.config.ts → สำหรับตั้งค่า Vitest
- setup.ts → สำหรับ Mock และตั้งค่าก่อนรัน Test


```bash

src/
└── __tests__/
    ├── setup/
    │   ├── setup.ts          // ตั้งค่า Vitest
    │   ├── mocks.ts          // mock ที่ใช้ร่วมกัน
    │   └── test-utils.tsx    // render พร้อม Provider
    │
    ├── utils/
    │   └── ...
    │
    ├── stores/
    │   └── ...
    │
    ├── services/
    │   └── ...
    │
    ├── hooks/
    │   └── ...
    │
    └── components/
        └── ...

```

# Roadmap Unit Test

```bash

Phase 1
━━━━━━━━━━━━━━
Stores (Client State)

__tests__/
└── stores/
    ├── auth.store.test.ts
    └── loading.store.test.ts


↓

Phase 2
━━━━━━━━━━━━━━
Services (API Layer)

__tests__/
└── services/
    ├── auth.service.test.ts
    └── driver.service.test.ts


↓

Phase 3
━━━━━━━━━━━━━━
Hooks (Business Logic Layer)

__tests__/
└── hooks/
    ├── usePermissions.test.ts
    └── useAuth.test.ts


↓

Phase 4
━━━━━━━━━━━━━━
TanStack Query Hooks

__tests__/
└── hooks/
    ├── useProfileQuery.test.ts
    └── useDriversQuery.test.ts


↓

Phase 5
━━━━━━━━━━━━━━
Components

__tests__/
└── components/
    ├── LoginForm.test.tsx
    └── Dropdown.test.tsx

```

