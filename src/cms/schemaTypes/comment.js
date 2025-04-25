import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({ 
      name: 'name', 
      type: 'string', 
      title: 'Name',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'message', 
      type: 'text', 
      title: 'Message',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'createdAt', 
      type: 'datetime', 
      title: 'Created At',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'message',
      createdAt: 'createdAt'
    },
    prepare({ title, subtitle, createdAt }) {
      return {
        title: title,
        subtitle: `${subtitle?.slice(0, 50)}... (${new Date(createdAt).toLocaleDateString()})`
      }
    }
  }
}) 