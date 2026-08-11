import type { APIRoute } from "astro";
import { isAuthenticated } from "../../../lib/auth";
import { getDB, getProfile, updateProfile } from "../../../lib/d1";
import { deleteFromCloudinary } from "../../../lib/cloudinary";

export const GET: APIRoute = async (context) => {
  const db = getDB(context.locals);
  if (!db) {
    return new Response(JSON.stringify({ error: "DB not found" }), { status: 500 });
  }

  const profile = await getProfile(db);
  if (!profile) {
    return new Response(JSON.stringify({ error: "Profile not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(profile), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const PUT: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const db = getDB(context.locals);
  if (!db) {
    return new Response(JSON.stringify({ error: "DB not found" }), { status: 500 });
  }

  try {
    const oldProfile = await getProfile(db);
    const data = await context.request.json();

    // Cloudinary Auto-Cleanup
    if (oldProfile && oldProfile.avatar && typeof oldProfile.avatar === 'string' && oldProfile.avatar.includes('cloudinary') && oldProfile.avatar !== data.avatar) {
      const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = (import.meta.env.PUBLIC_CLOUDINARY_API_KEY || "").trim(); 
      const apiSecret = (import.meta.env.CLOUDINARY_API_SECRET || "").trim(); 
      if (cloudName && apiKey && apiSecret) {
        deleteFromCloudinary(oldProfile.avatar, cloudName, apiKey, apiSecret).catch(() => {});
      }
    }

    const success = await updateProfile(db, data);
    
    if (success) {
      return new Response(JSON.stringify({ message: "Profile updated successfully" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Failed to update profile" }), { status: 500 });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
