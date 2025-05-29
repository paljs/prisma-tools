# Prisma Admin Pages Generator Instructions

Generate React admin pages for Prisma models with support for both Next.js Pages Router and App Router patterns. Creates complete admin interfaces for CRUD operations on database models.

## Configuration Options

- `routerType`: Router type - 'pages' for Next.js Pages Router or 'app' for Next.js App Router (default: 'pages')
- `models`: Array of model names to generate pages for (if not provided, generates for all models)
- `pageContent`: Custom page template content (if not provided, uses default templates)
- `outPut`: Output directory path (default: depends on router type)
- `backAsText`: Return generated content as text instead of writing files

## Router Type Patterns

### Pages Router Pattern

**File Structure:**
```
src/pages/admin/models/
├── User.tsx
├── Post.tsx
├── Category.tsx
└── ...
```

**Component Template:**
```tsx
import React from 'react';
import PrismaTable from 'components/PrismaTable';

const {ModelName}: React.FC = () => {
  return <PrismaTable model="{ModelName}" />;
};

export default {ModelName};
```

**Default Output Path:** `src/pages/admin/models/`

### App Router Pattern

**File Structure:**
```
src/app/admin/
├── layout.tsx
└── models/
    ├── layout.tsx
    ├── User/
    │   └── page.tsx
    ├── Post/
    │   └── page.tsx
    └── Category/
        └── page.tsx
```

**Page Component Template:**
```tsx
import React from 'react';
import PrismaTable from 'components/PrismaTable';

export default function {ModelName}Page() {
  return <PrismaTable model="{ModelName}" />;
}
```

**Admin Layout Template:**
```tsx
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
```

**Models Layout Template:**
```tsx
import React from 'react';

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="models-layout">
      {children}
    </div>
  );
}
```

**Default Output Path:** `src/app/admin/models/`

## Generation Rules

### For Pages Router:
1. Generate one `.tsx` file per model in the format `{ModelName}.tsx`
2. Use functional component pattern with React.FC type
3. Export as default export
4. Component name matches the model name exactly

### For App Router:
1. Generate directory structure: `{ModelName}/page.tsx`
2. Also generate required layout files:
   - `admin/layout.tsx` (admin root layout)
   - `admin/models/layout.tsx` (models section layout)
3. Use function declaration with `export default`
4. Function name follows pattern `{ModelName}Page`

## PrismaTable Component

All generated pages use a `PrismaTable` component which should:
- Accept a `model` prop with the model name as string
- Handle all CRUD operations for the specified model
- Provide data table functionality with sorting, filtering, pagination
- Include forms for create/update operations
- Handle relationships between models

Expected import: `import PrismaTable from 'components/PrismaTable';`

## Formatting Rules

Format all generated TypeScript/React files with Prettier using these options:
- `semi: true`
- `trailingComma: 'all'`
- `singleQuote: true`
- `printWidth: 120`
- `tabWidth: 2`
- `parser: 'babel-ts'`

## Model Filtering

When `models` array is provided in options:
- Only generate pages for models listed in the array
- Skip any models not included in the filter
- Process models in the order they appear in the array

## Custom Page Content

When `pageContent` is provided:
- Use the custom template instead of default
- Replace `#{id}` placeholder with the actual model name
- Apply the same formatting rules
- Maintain the same file naming conventions

## Example Output

For a User model with Pages Router:

**File:** `src/pages/admin/models/User.tsx`
```tsx
import React from 'react';
import PrismaTable from 'components/PrismaTable';

const User: React.FC = () => {
  return <PrismaTable model="User" />;
};

export default User;
```

For a User model with App Router:

**File:** `src/app/admin/models/User/page.tsx`
```tsx
import React from 'react';
import PrismaTable from 'components/PrismaTable';

export default function UserPage() {
  return <PrismaTable model="User" />;
}
```

## Error Handling

- Ensure output directory exists before writing files
- Handle model name validation and sanitization
- Provide clear error messages for invalid configurations
- Skip models that don't exist in the schema 