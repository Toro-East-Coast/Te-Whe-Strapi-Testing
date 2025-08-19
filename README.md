# Te Whe - Māori Language Learning Platform

A comprehensive Content Management System (CMS) built with Strapi for managing Māori language learning curricula, lessons, and vocabulary.

## 🎯 Project Overview

Te Whe is a Strapi-based CMS designed to manage educational content for Māori language learning. The platform provides a structured approach to organizing language curricula, units, lessons, and vocabulary with support for multimedia content and interactive activities.

## 🏗️ Architecture

### Content Structure

The platform follows a hierarchical content organization:

```
Curriculum
├── Units
│   └── Lessons
│       ├── Content Blocks
│       └── Activity Blocks
└── Vocabulary
```

### Technology Stack

- **Backend**: Strapi v5.15.0 (Headless CMS)
- **Database**: SQLite (better-sqlite3)
- **Frontend**: React 18 with Styled Components
- **Node.js**: 18.x - 22.x
- **Package Manager**: npm

## 📚 Content Types

### 1. Curriculum

The top-level content type that organizes learning materials by difficulty level.

**Attributes:**

- `title` (string): Curriculum name
- `description` (text): Detailed description
- `level` (enum): beginner, intermediate, advanced
- `is_published` (boolean): Publication status
- `order` (integer): Display order
- `estimated_duration` (integer): Time to complete in minutes
- `cover_image` (media): Curriculum cover image
- `units` (relation): Associated learning units
- `vocabularies` (relation): Related vocabulary words

### 2. Unit

Learning modules within a curriculum that group related lessons.

**Attributes:**

- `title` (string): Unit name
- `description` (blocks): Rich content description
- `order` (integer): Sequence within curriculum
- `is_published` (boolean): Publication status
- `curriculum` (relation): Parent curriculum
- `lessons` (relation): Child lessons

### 3. Lesson

Individual learning sessions within units.

**Attributes:**

- `title` (string): Lesson title
- `description` (blocks): Lesson content
- `order` (integer): Sequence within unit
- `is_published` (boolean): Publication status
- `estimated_duration` (integer): Time to complete
- `content_blocks` (component): Reusable content components
- `activities` (component): Interactive learning activities
- `unit` (relation): Parent unit

### 4. Vocabulary

Māori words and their translations with learning aids.

**Attributes:**

- `maori_word` (string): Māori term
- `english_translation` (string): English equivalent
- `pronunciation` (string): Phonetic guide
- `audio_pronunciation` (media): Audio file
- `example_sentence` (text): Usage example
- `difficulty_level` (enum): beginner, intermediate, advanced
- `curricula` (relation): Associated curricula

## 🧩 Components

### Content Block

Reusable content components for lessons.

**Types:**

- `text`: Textual content
- `audio`: Audio content
- `video`: Video content
- `image`: Image content

**Attributes:**

- `title` (string): Block title
- `content` (blocks): Rich content
- `media` (media): Associated media file
- `order` (integer): Display order

### Activity Block

Interactive learning activities for lessons.

**Types:**

- `mcq`: Multiple choice questions
- `fill-in`: Fill in the blanks
- `listening-prompt`: Audio-based exercises

**Attributes:**

- `question` (text): Activity question/prompt
- `options` (json): Answer choices
- `correct_answer` (string): Right answer
- `audio_prompt` (media): Audio instruction
- `points` (integer): Score value (default: 10)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x - 22.x
- npm 6.0.0+

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Te-Whe-Strapi-Testing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

### Development

1. **Start development server**

   ```bash
   npm run develop
   ```

   Access the admin panel at: http://localhost:1337/admin

2. **Build for production**

   ```bash
   npm run build
   ```

3. **Start production server**
   ```bash
   npm run start
   ```

### Database Seeding

Populate the database with sample data:

```bash
npm run seed:example
```

**Note**: Seeding can only be run once unless the database is cleared.

## 🔧 Configuration

### Database

The project uses SQLite by default. Database files are stored in the `database/` directory.

### Media Files

Uploaded media files are stored in the `public/uploads/` directory and managed through Strapi's media library.

### Permissions

The seed script automatically configures public read permissions for all content types.

## 📁 Project Structure

```
Te-Whe-Strapi-Testing/
├── config/                 # Strapi configuration files
├── database/              # Database files and migrations
├── public/                # Static assets and uploads
├── scripts/               # Database seeding and utilities
├── src/
│   ├── api/              # Content type definitions
│   │   ├── curriculum/   # Curriculum management
│   │   ├── unit/         # Unit management
│   │   ├── lesson/       # Lesson management
│   │   └── vocabulary/   # Vocabulary management
│   ├── components/       # Reusable components
│   │   ├── content/      # Content block components
│   │   └── activities/   # Activity block components
│   └── extensions/       # Strapi extensions
├── types/                 # TypeScript type definitions
└── package.json          # Project dependencies
```

## 🎨 Customization

### Adding New Content Types

1. Create new API structure in `src/api/`
2. Define schema in `content-types/[type]/schema.json`
3. Update permissions if needed
4. Restart the development server

### Modifying Components

1. Edit component schemas in `src/components/`
2. Update related content types
3. Restart the development server

## 🚀 Deployment

### Strapi Cloud

```bash
npm run deploy
```

### Self-hosted

1. Build the application: `npm run build`
2. Start production server: `npm run start`
3. Configure environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is proprietary software developed for Te Whe language learning platform.

## 🆘 Support

For technical support or questions:

- Check the [Strapi documentation](https://docs.strapi.io)
- Review the project's issue tracker
- Contact the development team

---

**Te Whe** - Empowering Māori language learning through technology
