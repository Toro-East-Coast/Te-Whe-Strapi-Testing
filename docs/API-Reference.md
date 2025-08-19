# Te Whe API Reference

This document provides detailed information about the API endpoints, data models, and usage examples for the Te Whe language learning platform.

## 🔗 Base URL

```
Development: http://localhost:1337
Production: [Your Production URL]
```

## 📋 Authentication

The API uses Strapi's built-in authentication system. Most endpoints require authentication except for public read operations.

### Authentication Headers

```http
Authorization: Bearer <your-jwt-token>
```

## 📚 Content Type APIs

### 1. Curriculum API

#### Get All Curricula

```http
GET /api/curricula
```

**Query Parameters:**

- `pagination[page]`: Page number (default: 1)
- `pagination[pageSize]`: Items per page (default: 25)
- `filters[level]`: Filter by difficulty level
- `filters[is_published]`: Filter by publication status
- `sort[0]`: Sort field (e.g., `order:asc`, `title:asc`)
- `populate`: Include related data (e.g., `units`, `vocabularies`)

**Example Response:**

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Māori Basics",
        "description": "Introduction to Māori language",
        "level": "beginner",
        "is_published": true,
        "order": 1,
        "estimated_duration": 120,
        "cover_image": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/maori_basics.jpg"
            }
          }
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

#### Get Single Curriculum

```http
GET /api/curricula/:id
```

**Query Parameters:**

- `populate`: Include related data

#### Create Curriculum

```http
POST /api/curricula
```

**Request Body:**

```json
{
  "data": {
    "title": "New Curriculum",
    "description": "Curriculum description",
    "level": "intermediate",
    "is_published": false,
    "order": 2,
    "estimated_duration": 180
  }
}
```

#### Update Curriculum

```http
PUT /api/curricula/:id
```

#### Delete Curriculum

```http
DELETE /api/curricula/:id
```

### 2. Unit API

#### Get All Units

```http
GET /api/units
```

**Query Parameters:**

- `filters[curriculum][id]`: Filter by curriculum ID
- `filters[is_published]`: Filter by publication status
- `sort[0]`: Sort by order
- `populate`: Include lessons and curriculum

#### Get Units by Curriculum

```http
GET /api/units?filters[curriculum][id]=1&populate=lessons
```

### 3. Lesson API

#### Get All Lessons

```http
GET /api/lessons
```

**Query Parameters:**

- `filters[unit][id]`: Filter by unit ID
- `filters[is_published]`: Filter by publication status
- `populate`: Include content_blocks, activities, and unit

#### Get Lesson with Full Content

```http
GET /api/lessons/:id?populate[content_blocks][populate]=*&populate[activities][populate]=*
```

### 4. Vocabulary API

#### Get All Vocabulary

```http
GET /api/vocabularies
```

**Query Parameters:**

- `filters[difficulty_level]`: Filter by difficulty
- `filters[curricula][id]`: Filter by curriculum
- `populate`: Include audio files and curricula

## 🧩 Component APIs

### Content Blocks

Content blocks are embedded within lessons and support various media types:

```json
{
  "type": "text",
  "title": "Introduction",
  "content": "Welcome to this lesson...",
  "order": 1
}
```

### Activity Blocks

Activity blocks provide interactive learning experiences:

```json
{
  "type": "mcq",
  "question": "What does 'Kia ora' mean?",
  "options": ["Hello", "Goodbye", "Thank you", "Please"],
  "correct_answer": "Hello",
  "points": 10
}
```

## 🔍 Advanced Queries

### Filtering Examples

**Get all beginner curricula with units:**

```http
GET /api/curricula?filters[level]=beginner&populate[units][populate]=lessons
```

**Get lessons from a specific unit:**

```http
GET /api/lessons?filters[unit][id]=1&sort[0]=order:asc
```

**Get vocabulary by difficulty:**

```http
GET /api/vocabularies?filters[difficulty_level]=beginner&populate=audio_pronunciation
```

### Sorting Examples

**Sort curricula by order:**

```http
GET /api/curricula?sort[0]=order:asc
```

**Sort units by order within curriculum:**

```http
GET /api/units?filters[curriculum][id]=1&sort[0]=order:asc
```

### Pagination Examples

**Get first 10 curricula:**

```http
GET /api/curricula?pagination[pageSize]=10&pagination[page]=1
```

**Get next page:**

```http
GET /api/curricula?pagination[pageSize]=10&pagination[page]=2
```

## 📊 Response Format

All API responses follow Strapi's standard format:

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        // Content attributes
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

## 🚨 Error Handling

### Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

### Error Response Format

```json
{
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Validation error",
    "details": {
      "errors": [
        {
          "path": ["title"],
          "message": "Title is required"
        }
      ]
    }
  }
}
```

## 🔐 Permissions

### Public Permissions

- Read access to all content types
- No authentication required for GET requests

### Authenticated Permissions

- Full CRUD operations for authenticated users
- Content creation and management
- Media upload capabilities

## 📱 Media Handling

### Supported File Types

- **Images**: JPG, PNG, GIF, WebP
- **Audio**: MP3, WAV, OGG
- **Video**: MP4, WebM, OGV
- **Documents**: PDF, DOC, TXT

### File Upload

```http
POST /api/upload
Content-Type: multipart/form-data

file: [binary file data]
```

### Media Library Access

```http
GET /api/upload/files
```

## 🧪 Testing

### Test Endpoints

Use the provided seed data to test the API:

```bash
npm run seed:example
```

### Sample Test Data

The seed script creates:

- Sample curricula with different difficulty levels
- Units with lessons
- Vocabulary words with audio
- Media files for testing

## 📈 Performance Tips

1. **Use pagination** for large datasets
2. **Limit populate** to only needed relations
3. **Use filters** to reduce data transfer
4. **Cache responses** when appropriate
5. **Optimize media** file sizes

## 🔗 Related Documentation

- [Strapi REST API Guide](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi Query Engine](https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication)
- [Strapi Media Library](https://docs.strapi.io/dev-docs/api/rest/upload)

---

For additional support or questions about the API, please refer to the main project documentation or contact the development team.
