CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`completed` integer DEFAULT false,
	`createdAt` integer
);
