import type { Schema, Struct } from '@strapi/strapi';

export interface ActivitiesActivityBlock extends Struct.ComponentSchema {
  collectionName: 'components_activities_activity_blocks';
  info: {
    displayName: 'activity-block';
  };
  attributes: {
    audio_prompt: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    correct_answer: Schema.Attribute.String;
    options: Schema.Attribute.JSON;
    points: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<10>;
    question: Schema.Attribute.Text;
    type: Schema.Attribute.Enumeration<['mcq', 'fill-in', 'listening-prompt']>;
  };
}

export interface ContentContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_content_blocks';
  info: {
    displayName: 'content-block';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    order: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['text', 'audio', 'video', 'image']>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'activities.activity-block': ActivitiesActivityBlock;
      'content.content-block': ContentContentBlock;
    }
  }
}
