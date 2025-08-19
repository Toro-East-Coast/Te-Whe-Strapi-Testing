# Te Whe Development Guide

This guide provides comprehensive information for developers working on the Te Whe language learning platform, including setup, development workflows, and best practices.

## 🚀 Development Environment Setup

### Prerequisites

- **Node.js**: Version 18.x - 22.x
- **npm**: Version 6.0.0+
- **Git**: For version control
- **Code Editor**: VS Code recommended with Strapi extensions

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Te-Whe-Strapi-Testing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your local settings
   ```

4. **Database setup**
   ```bash
   # SQLite database will be created automatically
   # For custom database, update config/database.js
   ```

5. **Seed the database**
   ```bash
   npm run seed:example
   ```

## 🏗️ Project Structure

```
Te-Whe-Strapi-Testing/
├── config/                 # Configuration files
│   ├── admin.ts           # Admin panel configuration
│   ├── api.ts             # API configuration
│   ├── database.ts        # Database configuration
│   ├── middlewares.ts     # Middleware configuration
│   ├── plugins.ts         # Plugin configuration
│   └── server.ts          # Server configuration
├── database/              # Database files
│   └── migrations/        # Database migrations
├── public/                # Public assets
│   └── uploads/           # Media uploads
├── scripts/               # Utility scripts
│   └── seed.js            # Database seeding
├── src/
│   ├── api/               # Content type definitions
│   │   ├── curriculum/    # Curriculum API
│   │   ├── unit/          # Unit API
│   │   ├── lesson/        # Lesson API
│   │   └── vocabulary/    # Vocabulary API
│   ├── components/        # Reusable components
│   │   ├── content/       # Content blocks
│   │   └── activities/    # Activity blocks
│   ├── extensions/        # Strapi extensions
│   └── index.ts           # Application entry point
├── types/                 # TypeScript definitions
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration Files

### Database Configuration (`config/database.ts`)

```typescript
export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
    useNullAsDefault: true,
  },
});
```

### Server Configuration (`config/server.ts`)

```typescript
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

### Admin Panel Configuration (`config/admin.ts`)

```typescript
export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});
```

## 📚 Content Type Development

### Creating New Content Types

1. **Generate API structure**
   ```bash
   npm run strapi generate
   # Select "API" and follow prompts
   ```

2. **Define schema** in `src/api/[type]/content-types/[type]/schema.json`

3. **Example schema structure:**
   ```json
   {
     "kind": "collectionType",
     "collectionName": "examples",
     "info": {
       "singularName": "example",
       "pluralName": "examples",
       "displayName": "Example"
     },
     "options": {
       "draftAndPublish": true
     },
     "attributes": {
       "title": {
         "type": "string",
         "required": true
       },
       "description": {
         "type": "text"
       }
     }
   }
   ```

### Adding Relations

```json
{
  "related_field": {
    "type": "relation",
    "relation": "manyToOne",
    "target": "api::target.target",
    "inversedBy": "examples"
  }
}
```

**Relation Types:**
- `oneToOne`: One-to-one relationship
- `oneToMany`: One-to-many relationship
- `manyToOne`: Many-to-one relationship
- `manyToMany`: Many-to-many relationship

### Component Development

1. **Create component** in `src/components/[category]/[name]/`

2. **Define component schema:**
   ```json
   {
     "collectionName": "components_category_name",
     "info": {
       "displayName": "Component Name"
     },
     "options": {},
     "attributes": {
       "field": {
         "type": "string"
       }
     }
   }
   ```

3. **Use component in content types:**
   ```json
   {
     "component_field": {
       "type": "component",
       "component": "category.name",
       "repeatable": true
     }
   }
   ```

## 🔌 Plugin Development

### Creating Custom Plugins

1. **Generate plugin structure**
   ```bash
   npm run strapi generate
   # Select "Plugin" and follow prompts
   ```

2. **Plugin structure:**
   ```
   src/plugins/[plugin-name]/
   ├── admin/
   ├── server/
   ├── package.json
   └── strapi-server.ts
   ```

3. **Register plugin** in `config/plugins.ts`

### Extending Existing Plugins

```typescript
// src/extensions/[plugin-name]/[extension-file].ts
export default (plugin) => {
  // Plugin extension logic
  return plugin;
};
```

## 🧪 Testing

### Unit Testing

1. **Install testing dependencies**
   ```bash
   npm install --save-dev jest @types/jest
   ```

2. **Create test files** with `.test.js` or `.spec.js` extension

3. **Run tests**
   ```bash
   npm test
   ```

### API Testing

1. **Use Postman or Insomnia** for API testing
2. **Test all CRUD operations**
3. **Verify response formats**
4. **Test error handling**

### Database Testing

1. **Use seed data** for consistent testing
2. **Test migrations** on fresh databases
3. **Verify data integrity** after operations

## 📝 Development Workflow

### Feature Development

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes** following coding standards

3. **Test thoroughly** before committing

4. **Commit with descriptive messages**
   ```bash
   git commit -m "feat: add new content type for exercises"
   ```

5. **Push and create pull request**

### Code Standards

- **JavaScript/TypeScript**: Use ES6+ features
- **Naming**: Use descriptive names, camelCase for variables
- **Comments**: Document complex logic
- **Error handling**: Always handle errors gracefully
- **Validation**: Validate input data

### Git Workflow

- **Main branch**: Production-ready code
- **Develop branch**: Integration branch
- **Feature branches**: Individual features
- **Hotfix branches**: Critical bug fixes

## 🔍 Debugging

### Logging

```typescript
// Use Strapi's built-in logging
strapi.log.info('Information message');
strapi.log.warn('Warning message');
strapi.log.error('Error message');
strapi.log.debug('Debug message');
```

### Database Queries

```typescript
// Debug database queries
const result = await strapi.db.query('api::model.model').findMany({
  where: { field: 'value' },
  populate: ['relation'],
});
console.log('Query result:', result);
```

### API Debugging

1. **Check Strapi logs** in terminal
2. **Use browser dev tools** for admin panel
3. **Verify API responses** with Postman
4. **Check database state** directly

## 🚀 Performance Optimization

### Database Optimization

1. **Use indexes** for frequently queried fields
2. **Limit populate** to necessary relations
3. **Use pagination** for large datasets
4. **Optimize queries** with proper filters

### Media Optimization

1. **Compress images** before upload
2. **Use appropriate formats** (WebP for images)
3. **Implement lazy loading** for media
4. **Cache media files** when possible

### API Optimization

1. **Implement caching** strategies
2. **Use field selection** to limit data
3. **Optimize response size** with filters
4. **Monitor API performance** metrics

## 🔒 Security Best Practices

### Authentication

1. **Use strong JWT secrets**
2. **Implement rate limiting**
3. **Validate user permissions**
4. **Secure admin panel access**

### Data Validation

1. **Validate all input data**
2. **Sanitize user content**
3. **Use content security policies**
4. **Implement proper CORS settings**

### File Upload Security

1. **Validate file types**
2. **Limit file sizes**
3. **Scan for malware**
4. **Store files securely**

## 📊 Monitoring and Logging

### Application Monitoring

1. **Monitor API response times**
2. **Track error rates**
3. **Monitor database performance**
4. **Watch memory usage**

### Logging Strategy

1. **Log all errors** with context
2. **Track user actions** for analytics
3. **Monitor system health**
4. **Archive logs** regularly

## 🚀 Deployment

### Development Deployment

1. **Build application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

### Production Deployment

1. **Environment setup**
   - Configure production database
   - Set production environment variables
   - Configure media storage

2. **Build and deploy**
   ```bash
   npm run build
   npm run start
   ```

3. **Monitor deployment**
   - Check application health
   - Verify database connections
   - Test critical functionality

## 🔗 Useful Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi GitHub Repository](https://github.com/strapi/strapi)
- [Strapi Community Forum](https://forum.strapi.io)
- [Strapi Discord](https://discord.strapi.io)

## 📞 Getting Help

- **Documentation**: Check project docs first
- **Issues**: Use GitHub issues for bugs
- **Discussions**: Use GitHub discussions for questions
- **Team**: Contact development team for urgent issues

---

**Happy coding!** 🎉
