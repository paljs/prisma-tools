# @paljs/admin

A comprehensive React admin UI package for Prisma-based applications. This package provides ready-to-use components for building admin interfaces with full CRUD operations, form handling, and table management.

## Installation

```bash
npm install @paljs/admin
# or
yarn add @paljs/admin
# or
pnpm add @paljs/admin
```

## Dependencies

This package requires the following peer dependencies:
- React ^18.2.0
- React DOM ^18.2.0
- React Hook Form
- @apollo/client (for GraphQL operations)

## Features

- 🎨 **Modern UI Components** - Built with Tailwind CSS and Headless UI
- 📝 **Dynamic Forms** - Auto-generated forms based on Prisma schema
- 📊 **Data Tables** - Sortable, filterable tables with pagination
- 🔧 **CRUD Operations** - Complete Create, Read, Update, Delete functionality
- 🎯 **Type Safety** - Full TypeScript support
- 🎨 **Customizable** - Flexible theming and styling options
- 📱 **Responsive** - Mobile-friendly design

## Main Exports

### Components

#### PrismaTable
The main table component for displaying and managing Prisma model data.

```typescript
import { PrismaTable } from '@paljs/admin';

interface PrismaTableProps<T = any> {
  model: string;
  data: T[];
  columns: Column<T>[];
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onCreate?: () => void;
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
}

// Usage
<PrismaTable
  model="User"
  data={users}
  columns={userColumns}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onCreate={handleCreate}
  loading={loading}
  pagination={paginationConfig}
/>
```

#### Settings
Configuration component for admin panel settings.

```typescript
import { Settings } from '@paljs/admin';

interface SettingsProps {
  models: ModelSettings[];
  onSave: (settings: ModelSettings[]) => void;
  onReset: () => void;
}

// Usage
<Settings
  models={modelSettings}
  onSave={handleSaveSettings}
  onReset={handleResetSettings}
/>
```

### Types and Interfaces

#### TableParentRecord
Interface for parent record relationships in tables.

```typescript
interface TableParentRecord {
  name: string;
  value: any;
  field: string;
  updateRecord?: () => Promise<any>;
}
```

#### Column Configuration
Define table columns with sorting, filtering, and custom rendering.

```typescript
interface Column<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string | number;
}
```

### Form Components

#### Dynamic Form Generation
Auto-generate forms based on Prisma schema definitions.

```typescript
import { PrismaForm } from '@paljs/admin';

interface PrismaFormProps {
  model: string;
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel?: () => void;
  loading?: boolean;
}

// Usage
<PrismaForm
  model="User"
  fields={userFields}
  initialValues={editingUser}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  loading={submitting}
/>
```

### Utility Functions

#### classNames
Utility function for conditional CSS class names.

```typescript
function classNames(...classes: string[]): string;

// Usage
const buttonClass = classNames(
  'btn',
  'btn-primary',
  isLoading && 'btn-loading',
  isDisabled && 'btn-disabled'
);
```

## Advanced Usage

### Custom Table Columns

```typescript
const userColumns: Column<User>[] = [
  {
    key: 'id',
    title: 'ID',
    sortable: true,
    width: 80,
  },
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'email',
    title: 'Email',
    sortable: true,
    filterable: true,
  },
  {
    key: 'createdAt',
    title: 'Created',
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: 'actions',
    title: 'Actions',
    render: (_, record) => (
      <div className="flex space-x-2">
        <button onClick={() => handleEdit(record)}>Edit</button>
        <button onClick={() => handleDelete(record)}>Delete</button>
      </div>
    ),
  },
];
```

### Form Field Configuration

```typescript
const userFields: FieldConfig[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Full Name',
    required: true,
    validation: {
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    name: 'role',
    type: 'select',
    label: 'Role',
    options: [
      { value: 'USER', label: 'User' },
      { value: 'ADMIN', label: 'Admin' },
    ],
  },
];
```

### Integration with Apollo Client

```typescript
import { useQuery, useMutation } from '@apollo/client';
import { PrismaTable } from '@paljs/admin';

function UserManagement() {
  const { data, loading, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  const handleDelete = async (user: User) => {
    await deleteUser({ variables: { id: user.id } });
    refetch();
  };

  const handleEdit = async (user: User) => {
    // Open edit modal or navigate to edit page
  };

  return (
    <PrismaTable
      model="User"
      data={data?.users || []}
      columns={userColumns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
```

## Styling

The package uses Tailwind CSS for styling. Make sure to include Tailwind CSS in your project:

```bash
npm install -D tailwindcss @tailwindcss/forms
```

Include the admin styles in your CSS:

```css
@import '@paljs/admin/dist/style.css';
```

## TypeScript Support

This package is written in TypeScript and provides full type definitions. All components and functions are properly typed for the best development experience.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This package is part of the PalJS ecosystem. For contributing guidelines, please refer to the main repository.

## License

MIT License - see the LICENSE file for details.
