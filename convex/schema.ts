import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    language: v.optional(v.union(v.literal('en'), v.literal('es'))),
  })
    .index('email', ['email'])
    .index('phone', ['phone']),
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
});
