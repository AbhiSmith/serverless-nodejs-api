CREATE TABLE IF NOT EXISTS "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"description" text DEFAULT 'This is my comment',
	"created_at" timestamp DEFAULT now()
);
