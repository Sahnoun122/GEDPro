src/
├── app.module.ts
├── main.ts
│
├── auth/                       # Authentication (login/register + JWT)
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   └── decorators/
│       └── roles.decorator.ts
│
├── users/                      # Users (admin/rh/manager profiles)
│   ├── users.entity.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── users.module.ts
│
├── organisations/              # Organisation (multi-tenant)
│   ├── organisation.entity.ts
│   ├── organisation.service.ts
│   ├── organisation.controller.ts
│   └── organisation.module.ts
│
├── forms/                     # Dynamic forms structure
│   ├── form.entity.ts
│   ├── form.service.ts
│   ├── form.controller.ts
│   ├── form.module.ts
│   ├── dto/
│   │   ├── create-form.dto.ts
│   │   └── update-form.dto.ts
│   └── fields/                # Submodule for fields
│       ├── field.entity.ts
│       ├── field.service.ts
│       ├── field.controller.ts
│       ├── field.module.ts
│       ├── dto/
│       │   ├── create-field.dto.ts
│       │   └── update-field.dto.ts
│
├── responses/                 # Dynamic form responses
│   ├── response.entity.ts
│   ├── response.service.ts
│   ├── response.controller.ts
│   └── response.module.ts
│
├── candidates/                # Candidate profiles and workflow
│   ├── candidate.entity.ts
│   ├── candidate.service.ts
│   ├── candidate.controller.ts
│   ├── candidate.module.ts
│   ├── dto/
│   │   ├── create-candidate.dto.ts
│   │   └── update-candidate.dto.ts
│   └── workflow/              # Track states
│       ├── state.entity.ts
│       ├── state.service.ts
│       ├── state.controller.ts
│       └── state.module.ts
│
├── documents/                 # Document storage + MinIO
│   ├── document.entity.ts
│   ├── document.service.ts
│   ├── document.controller.ts
│   ├── document.module.ts
│   └── storage/               # integration with MinIO
│       ├── minio.service.ts
│       └── minio.module.ts
│
├── ocr/                       # OCR + Skills extraction
│   ├── ocr.service.ts
│   └── ocr.module.ts
│
├── calendar/                  # Calendar sync (Google / CalDAV)
│   ├── calendar.service.ts
│   └── calendar.module.ts
│
├── notifications/             # Websocket / Realtime
│   ├── notifications.gateway.ts
│   ├── notifications.service.ts
│   └── notifications.module.ts
└── shared/                    # Shared utilities / guards / decorators
    ├── guards/
    ├── interceptors/
    ├── pipes/
    └── utils/
