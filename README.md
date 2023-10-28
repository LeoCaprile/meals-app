# Elysia with Bun runtime and htmx

## Getting Started

### Folder structure

```
.
├── auth -> auth config folder.
│   ├── lucia.ts -> lucia config.
│   ├── middleware.ts -> session middleware.
│   └── protectedPage.ts -> plugin to protect routes to only logged users
├── components -> component folder, jsx components.
│   ├── baseHTML.tsx -> HTML base wrapper, no need to use it inside your page components.
│   ├── FormButton.tsx
│   ├── Item.tsx
│   └── Navbar.tsx
├── config -> env variables export, validated with zod.
│   └── index.ts
├── context -> context of the application includes db, auth, etc. to use it within our controllers.
│   └── index.tsx
├── controllers -> controllers are the request to make with "hx" tags. or other.
│   ├── auth.controller.tsx -> handles the authentication.
│   ├── index.ts
│   └── todo.controller.tsx
├── db -> db config and schema.
│   ├── index.ts
│   └── schema
│       ├── index.ts
│       ├── todo.ts
│       └── user.ts
├── htmx.d.ts -> htmx types for hx-get, hx-post, hx-put, hx-patch tags to fully typed.
├── lib -> anything that has to be shared among application.
│   └── index.ts
├── lucia.d.ts --> types required for lucia.
├── main.ts -> entry point of our app where all the routers converge.
└── pages -> pages of our using renderPage func. to use the baseHTML.
    ├── auth
    │   └── signIn.tsx
    ├── home
    │   └── index.tsx
    ├── index.ts
    └── todos
        └── index.tsx

```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
