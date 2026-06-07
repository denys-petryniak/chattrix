import { z } from "zod";

/**
 * Why Zod schemas — and not just TypeScript types?
 *
 * TypeScript checks types at COMPILE time, then is erased from the build.
 * It cannot see real, untrusted data arriving at runtime (request bodies,
 * external API responses, storage reads).
 *
 * Zod validates the ACTUAL data at RUNTIME and rejects anything that doesn't
 * match before it reaches our logic.
 *
 * They are complementary: TS guards the code in the editor; Zod guards the
 * data on the wire. (Bonus: `z.infer<typeof Schema>` derives the TS type from
 * the schema, so there's a single source of truth.)
 */

// Message role enum and type definition
const MessageRole = z.enum(["user", "assistant"]);

// Base message schema
export const MessageSchema = z
  .object({
    content: z.string(),
    role: MessageRole,
    id: z.uuid().optional(),
    chatId: z.uuid().optional(),
  })
  .strict();

// Chat and message related schemas
export const ChatMessageSchema = z
  .object({
    messages: z.array(MessageSchema),
    chatId: z.uuid(),
  })
  .strict();

export const CreateMessageSchema = z
  .object({
    content: z.string().min(1),
    role: MessageRole,
  })
  .strict();

// Project related schemas
export const CreateProjectSchema = z
  .object({
    name: z.string().min(1),
  })
  .strict();

export const UpdateProjectSchema = z
  .object({
    name: z.string().min(1),
  })
  .strict();

// Chat related schemas
export const CreateChatSchema = z
  .object({
    title: z.string().min(1).optional(),
    projectId: z.uuid().optional(),
  })
  .strict();

export const UpdateChatTitleSchema = z
  .object({
    message: z.string().min(1),
  })
  .strict();
