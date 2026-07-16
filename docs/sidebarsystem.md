# ปัญหาหลักของ Sidebar

reader ไม่ได้อ้วน อ้วนที่ Decision เวลาเพิ่มเงื่อนไข โค้ดอ่านจัดการยาก

```bash

Render
+
Decision
+
Permission
+
Route
+
State
+
Interaction

อยู่กองเดียวกัน

```

# Decision Engine

```bash

                 User Interaction
                       |
                       v

                 Sidebar UI
                       |
          +------------+------------+
          |                         |
          v                         v

 SidebarDecision              Sidebar Action

 (อ่าน)                        (เขียน)

          |                         |
          v                         v

   Render UI                  Store Update
          |
          v

   useSidebarDecision()
          |
          v

   Decision Pipeline

```