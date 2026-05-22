CREATE TABLE "mission_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"roadmap_level_id" integer NOT NULL,
	"order" integer NOT NULL,
	"title" varchar(200) NOT NULL,
	"category" varchar(100) NOT NULL,
	"difficulty" varchar(20) NOT NULL,
	"duration_minutes" integer NOT NULL,
	"description" text NOT NULL,
	"learning_goal" text NOT NULL,
	"instructions" jsonb NOT NULL,
	"requirements" jsonb NOT NULL,
	"hint" text,
	"accepts_figma_link" boolean DEFAULT true,
	"accepts_file_upload" boolean DEFAULT true,
	"question1" text NOT NULL,
	"question2" text NOT NULL,
	"question3" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "quiz_answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"result_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"selected_option" integer,
	"is_correct" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "quiz_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"question" text NOT NULL,
	"options" jsonb NOT NULL,
	"correct_answer" integer NOT NULL,
	"skill_name" varchar(100) NOT NULL,
	"difficulty" varchar(20) NOT NULL,
	"explanation" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "quiz_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"overall_match" integer NOT NULL,
	"level_badge" varchar(20) NOT NULL,
	"skills_analysis" jsonb NOT NULL,
	"total_correct" integer DEFAULT 0,
	"total_incorrect" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "roadmap_levels" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"level" varchar(20) NOT NULL,
	"level_label" varchar(50) NOT NULL,
	"description" text,
	"skills" jsonb NOT NULL,
	"tools" jsonb NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"career_level" varchar(50),
	"estimate_years" varchar(50),
	"is_popular" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "trending_skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"skill_name" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"popularity_score" integer NOT NULL,
	"growth" integer NOT NULL,
	"demand" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_task_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"task_id" integer NOT NULL,
	"roadmap_level_id" integer NOT NULL,
	"figma_link" text,
	"file_url" text,
	"answer1" text NOT NULL,
	"answer2" text NOT NULL,
	"answer3" text NOT NULL,
	"status" varchar(20) DEFAULT 'submitted' NOT NULL,
	"submitted_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(150) NOT NULL,
	"password" text,
	"google_id" varchar(255),
	"github_id" varchar(255),
	"avatar" text,
	"role_id" integer,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_github_id_unique" UNIQUE("github_id")
);
--> statement-breakpoint
ALTER TABLE "mission_tasks" ADD CONSTRAINT "mission_tasks_roadmap_level_id_roadmap_levels_id_fk" FOREIGN KEY ("roadmap_level_id") REFERENCES "public"."roadmap_levels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_result_id_quiz_results_id_fk" FOREIGN KEY ("result_id") REFERENCES "public"."quiz_results"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_question_id_quiz_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roadmap_levels" ADD CONSTRAINT "roadmap_levels_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_task_submissions" ADD CONSTRAINT "user_task_submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_task_submissions" ADD CONSTRAINT "user_task_submissions_task_id_mission_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."mission_tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_task_submissions" ADD CONSTRAINT "user_task_submissions_roadmap_level_id_roadmap_levels_id_fk" FOREIGN KEY ("roadmap_level_id") REFERENCES "public"."roadmap_levels"("id") ON DELETE no action ON UPDATE no action;