// sanity/schemaTypes/postType.js
import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
    }),
    defineField({
      name: "category",
      type: "reference",
      to: { type: "category" },
    }),
    defineField({
      name: "mainImage",
      title: "Main Image URL",
      type: "url",
      description: "Cloudinary image URL",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional image caption",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Brief summary",
    }),
  ],
});
