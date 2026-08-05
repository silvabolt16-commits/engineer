/// <reference path="../.astro/types.d.ts" />

type D1Database = any;

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
        PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
        PUBLIC_CLOUDINARY_UPLOAD_PRESET?: string;
        ADMIN_PASSWORD?: string;
      };
    };
  }
}
