import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
        {
          name: 'es',
          title: 'Spanish',
          type: 'string',
        },
        {
          name: 'fr',
          title: 'French',
          type: 'string',
        },
        {
          name: 'de',
          title: 'German',
          type: 'string',
        },
        {
          name: 'it',
          title: 'Italian',
          type: 'string',
        },
        {
          name: 'el',
          title: 'Greek',
          type: 'string',
        },
        {
          name: 'rs',
          title: 'Serbian',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'es', type: 'text', title: 'Spanish' },
        { name: 'fr', type: 'text', title: 'French' },
        { name: 'de', type: 'text', title: 'German' },
        { name: 'it', type: 'text', title: 'Italian' },
        { name: 'el', type: 'text', title: 'Greek' },
        { name: 'rs', type: 'text', title: 'Serbian' },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'blockContent',
        },
        {
          name: 'es',
          title: 'Spanish',
          type: 'blockContent',
        },
        {
          name: 'fr',
          title: 'French',
          type: 'blockContent',
        },
        {
          name: 'de',
          title: 'German',
          type: 'blockContent',
        },
        {
          name: 'it',
          title: 'Italian',
          type: 'blockContent',
        },
        {
          name: 'el',
          title: 'Greek',
          type: 'blockContent',
        },
        {
          name: 'rs',
          title: 'Serbian',
          type: 'blockContent',
        }
      ]
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'comment' }] }],
    }),
  ],

  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
