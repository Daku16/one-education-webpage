export default ({ env }) => ({
  upload: {
    config: {
      provider: "@strapi/provider-upload-cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          resource_type: "auto",
          folder: "one-education-platform",
          use_filename: true,
          unique_filename: true,
        },
        uploadStream: {
          resource_type: "auto",
          folder: "one-education-platform",
          use_filename: true,
          unique_filename: true,
        },
        delete: {},
      },
    },
  },
});