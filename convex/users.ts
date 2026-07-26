import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getMe = query({
  args: {},
  returns: v.union(v.null(), v.any()),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.get(userId);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');
    return await ctx.storage.generateUploadUrl();
  },
});

export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    storageId: v.optional(v.id('_storage')),
  },
  returns: v.null(),
  handler: async (ctx, { name, storageId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');

    const patch: { name?: string; image?: string } = {};
    if (name !== undefined) patch.name = name;
    if (storageId) {
      const image = await ctx.storage.getUrl(storageId);
      if (image) patch.image = image;
    }
    if (Object.keys(patch).length === 0) return null;
    await ctx.db.patch(userId, patch);
    return null;
  },
});

export const setLanguage = mutation({
  args: {
    language: v.union(v.literal('en'), v.literal('es')),
  },
  returns: v.null(),
  handler: async (ctx, { language }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');
    await ctx.db.patch(userId, { language });
    return null;
  },
});
