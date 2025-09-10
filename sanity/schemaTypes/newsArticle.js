export default {
  name: "newsArticle",
  title: "समाचार लेख",
  type: "document",
  fields: [
    {
      name: "title",
      title: "शीर्षक (Heading)",
      type: "string",
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: "slug",
      title: "Slug (URL के लिए)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "श्रेणी (Category)",
      type: "string",
      options: {
        list: [
          { title: "देश-विदेश", value: "देश-विदेश" },
          { title: "जीवन के रंग", value: "जीवन के रंग" },
          { title: "विविध", value: "विविध" },
          { title: "प्रतिरोध", value: "प्रतिरोध" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "संक्षिप्त विवरण (Matter Summary)",
      type: "text",
      rows: 3,
      description: "यह होम पेज पर card में दिखेगा",
    },
    {
      name: "content",
      title: "मुख्य सामग्री (Full Content)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          title: "इमेज",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "कैप्शन",
              type: "string",
              description: "इमेज के नीचे दिखने वाला टेक्स्ट",
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "SEO के लिए",
            },
          ],
        },
      ],
    },
    {
      name: "featuredImage",
      title: "मुख्य चित्र (Main Image)",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          title: "कैप्शन",
          type: "string",
        },
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
      description: "यह card और article के टॉप पर दिखेगा",
    },
    {
      name: "publishedAt",
      title: "प्रकाशन समय (Time)",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "viewsCount",
      title: "व्यूज काउंट",
      type: "number",
      initialValue: 0,
      description: "यह automatically update होगा",
    },
    {
      name: "isBreaking",
      title: "ब्रेकिंग न्यूज?",
      type: "boolean",
      initialValue: false,
      description: "ब्रेकिंग न्यूज को top पर दिखाने के लिए",
    },
    {
      name: "tags",
      title: "टैग्स",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],

  // Preview में कैसे दिखेगा
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      category: "category",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { title, media, category, publishedAt } = selection;
      return {
        title: title,
        subtitle: `${category} | ${new Date(publishedAt).toLocaleDateString("hi-IN")}`,
        media: media,
      };
    },
  },

  // Default sorting
  orderings: [
    {
      title: "नवीनतम पहले",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "ब्रेकिंग न्यूज पहले",
      name: "breakingFirst",
      by: [
        { field: "isBreaking", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
    {
      title: "सबसे ज्यादा व्यूज",
      name: "mostViewed",
      by: [{ field: "viewsCount", direction: "desc" }],
    },
  ],
};
