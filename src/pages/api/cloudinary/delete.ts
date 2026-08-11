import type { APIRoute } from "astro";
import { isAuthenticated } from "../../../lib/auth";
import { deleteFromCloudinary } from "../../../lib/cloudinary";

export const POST: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = (import.meta.env.PUBLIC_CLOUDINARY_API_KEY || "").trim(); 
  const apiSecret = (import.meta.env.CLOUDINARY_API_SECRET || "").trim(); 

  if (!cloudName || !apiKey || !apiSecret) {
    return new Response(JSON.stringify({ error: "Cloudinary credentials missing in .env" }), { status: 500 });
  }

  try {
    const { url } = await context.request.json();
    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: "No URL provided" }), { status: 400 });
    }

    const success = await deleteFromCloudinary(url, cloudName, apiKey, apiSecret);
    
    if (success) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Failed to delete from Cloudinary" }), { status: 400 });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
