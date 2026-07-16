# Sidebar Decision Engine

## Overview

The Sidebar Decision Engine separates rendering decisions from UI rendering.

Instead of placing routing, permissions, and state checks inside the Sidebar component, those decisions are centralized in a dedicated hook.

```text
User
  ↓
Sidebar
  ↓
useSidebarDecision()
  ↓
Decision Pipeline
  ├─ Route
  ├─ Permission
  ├─ State
  └─ Visibility
```

## Responsibilities

- Determine visible menu items (ตัดสินใจว่าเมนูใดควรแสดง)
- Check user permissions (ตรวจสอบสิทธิ์ของผู้ใช้งาน)
- Evaluate current route (วิเคราะห์หน้าปัจจุบัน)
- Control sidebar state (กำหนดพฤติกรรมของ Sidebar ตามสถานะของระบบ)

## Benefits

- Cleaner components
- Easier to maintain
- Easier to test
- Centralized decision logic