# Prisma Admin Settings Generator Instructions

Generate admin settings configuration files for Prisma models. Creates comprehensive settings schemas that define how models should be displayed and managed in admin interfaces.

## Purpose

This generator creates configuration files that define:
- Which fields should be displayed in admin tables
- Which operations (create, update, delete) are allowed per model
- Field-level permissions and display settings
- UI customization options for admin interfaces

## Configuration Options

- `path`: Output path for the settings file (default: "adminSettings.json")
- `backAsText`: Return generated content as text instead of writing files

## Settings Schema Structure

### Model Settings
```typescript
interface AdminSchemaModel {
  id: string;                    // Model name (e.g., "User")
  name: string;                  // Display name (e.g., "User")
  idField: string;               // Primary key field name
  displayFields: string[];       // Fields to show in table lists
  create: boolean;               // Allow create operations
  update: boolean;               // Allow update operations  
  delete: boolean;               // Allow delete operations
  fields: AdminSchemaField[];    // Field configurations
}
```

### Field Settings
```typescript
interface AdminSchemaField {
  id: string;                    // Unique field identifier "ModelName.fieldName"
  name: string;                  // Field name from Prisma schema
  title: string;                 // Display title (auto-generated from field name)
  type: string;                  // Prisma field type
  list: boolean;                 // Is this field a list/array
  optional: boolean;             // Is this field optional
  isId: boolean;                 // Is this the ID field
  unique: boolean;               // Is this field unique
  relationField?: boolean;       // Is this a relation field
  kind: string;                  // Field kind (scalar, object, enum)
  create: boolean;               // Show in create forms
  update: boolean;               // Show in update forms
  read: boolean;                 // Show in read views
  filter: boolean;               // Allow filtering by this field
  sort: boolean;                 // Allow sorting by this field
  editor: boolean;               // Use rich text editor
  upload: boolean;               // Is this an upload field
  order: number;                 // Display order (-1 for auto)
}
```

## Generation Logic

### Model Processing
For each Prisma model, generate admin settings:

1. **Model Metadata**:
   - `id`: Use exact model name from Prisma schema
   - `name`: Generate display name by splitting camelCase (e.g., "BlogPost" → "Blog Post")
   - `idField`: Find the field marked with `@id` directive
   - `displayFields`: Default to the first field (usually ID field)

2. **Operation Permissions**:
   - `create`: `true` (allow create operations)
   - `update`: `true` if model has ID field, `false` otherwise
   - `delete`: `true` if model has ID field, `false` otherwise

3. **Field Processing**:
   For each field in the model, generate field settings

### Field Processing Rules

#### Field Metadata
- `id`: Combine model name and field name: `"ModelName.fieldName"`
- `name`: Use exact field name from Prisma schema
- `title`: Generate display title by splitting camelCase and capitalizing
- Copy type information from Prisma schema: `type`, `list`, `optional`, `isId`, `unique`, etc.

#### Default Field Permissions
Based on field characteristics:

```typescript
// Default excluded from forms (read-only)
const defaultReadOnlyFields = ['id', 'createdAt', 'updatedAt'];

// Field permissions
create: !defaultReadOnlyFields.includes(fieldName) && !field.relationField
update: !defaultReadOnlyFields.includes(fieldName) && !field.relationField
read: true                    // Always readable
filter: true                  // Always filterable
sort: true                    // Always sortable
editor: false                 // Rich text editor (manual override)
upload: false                 // File upload (manual override)
order: -1                     // Auto-order (can be manually set)
```

#### Special Field Handling
- **ID Fields**: Read-only, not editable in create/update forms
- **Timestamp Fields** (`createdAt`, `updatedAt`): Read-only, automatically managed
- **Relation Fields**: Not directly editable, handled through relationship selectors
- **Enum Fields**: Use dropdown selectors in forms

### Schema Merging

When an existing settings file exists, merge with new schema:

1. **Preserve Existing Settings**: Keep all manually configured settings
2. **Add New Models**: Add models that don't exist in current settings
3. **Add New Fields**: Add fields that don't exist in current model settings
4. **Update Field Metadata**: Update type information from current Prisma schema
5. **Preserve Custom Order**: Maintain custom field ordering

### Merging Algorithm
```typescript
function mergeSchema(prismaSchema: SchemaObject, existingSettingsPath: string) {
  const existingSettings = parseExistingSettings(existingSettingsPath);
  const newSettings = { models: [], enums: prismaSchema.enums };
  
  for (const model of prismaSchema.models) {
    const existingModel = existingSettings.models.find(m => m.id === model.name);
    
    if (!existingModel) {
      // New model - generate default settings
      newSettings.models.push(generateDefaultModelSettings(model));
    } else {
      // Existing model - merge settings
      const mergedModel = {
        ...existingModel,  // Preserve custom settings
        fields: []
      };
      
      for (const field of model.fields) {
        const existingField = existingModel.fields.find(f => f.name === field.name);
        
        if (!existingField) {
          // New field - generate default settings
          mergedModel.fields.push(generateDefaultFieldSettings(field, model.name));
        } else {
          // Existing field - merge with updated metadata
          mergedModel.fields.push({
            ...existingField,        // Preserve custom settings
            ...getUpdatedFieldMetadata(field, model.name)  // Update from schema
          });
        }
      }
      
      // Sort fields by custom order
      mergedModel.fields.sort((a, b) => a.order - b.order);
      newSettings.models.push(mergedModel);
    }
  }
  
  return newSettings;
}
```

## Title Generation

Convert camelCase field/model names to human-readable titles:

```typescript
function generateTitle(name: string): string {
  // Split on capital letters: "firstName" → ["first", "Name"]
  const words = name.split(/(?=[A-Z])/);
  
  // Capitalize first word: ["first", "Name"] → ["First", "Name"]
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  
  // Join with spaces: ["First", "Name"] → "First Name"
  return words.join(' ');
}
```

Examples:
- `firstName` → `"First Name"`
- `createdAt` → `"Created At"`
- `blogPost` → `"Blog Post"`
- `userId` → `"User Id"`

## Output Format

Generate formatted JSON with Prettier:

```json
{
  "models": [
    {
      "id": "User",
      "name": "User",
      "idField": "id",
      "displayFields": ["id"],
      "create": true,
      "update": true,
      "delete": true,
      "fields": [
        {
          "id": "User.id",
          "name": "id",
          "title": "Id",
          "type": "String",
          "list": false,
          "optional": false,
          "isId": true,
          "unique": true,
          "kind": "scalar",
          "create": false,
          "update": false,
          "read": true,
          "filter": true,
          "sort": true,
          "editor": false,
          "upload": false,
          "order": -1
        }
      ]
    }
  ],
  "enums": []
}
```

## Usage Examples

### Basic Generation
Generate settings for all models with default configuration:
```typescript
const settings = await buildSettingsSchema('adminSettings.json');
```

### With Existing Settings
Merge new schema with existing customizations:
```typescript
// Existing adminSettings.json will be merged with current Prisma schema
const settings = await buildSettingsSchema('adminSettings.json');
```

### Custom Output Path
```typescript
const settings = await buildSettingsSchema('config/admin.json');
```

## Integration with Admin UI

The generated settings file is used by admin interfaces to:

1. **Table Configuration**: Use `displayFields` to show relevant columns
2. **Form Generation**: Use field `create`/`update` permissions for form fields
3. **Operation Buttons**: Use model `create`/`update`/`delete` permissions for UI buttons
4. **Field Ordering**: Use `order` property to arrange form fields
5. **Input Types**: Use field `type` and `kind` to render appropriate form controls
6. **Validation**: Use `optional` and `unique` for form validation rules

## Formatting Rules

Format output JSON with Prettier:
- `singleQuote: true`
- `semi: false`
- `trailingComma: 'all'`
- `parser: 'json'` 