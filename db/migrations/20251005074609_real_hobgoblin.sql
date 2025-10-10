CREATE TABLE "admins" (
	"50" varchar NOT NULL,
	"256" varchar NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_50_unique" UNIQUE("50")
);
--> statement-breakpoint
CREATE TABLE "guests" (
	"15" varchar,
	"50" varchar NOT NULL,
	"100" varchar NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "guest_email_phone_user_id_unique" UNIQUE("100","user_id","15")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"50" varchar NOT NULL,
	"100" varchar NOT NULL,
	"256" varchar NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_100_unique" UNIQUE("100")
);
--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;