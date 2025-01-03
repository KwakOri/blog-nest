-- CreateTable
CREATE TABLE "bokdeokbang_blogs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "subdomain" VARCHAR(255) NOT NULL,
    "owner_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "bokdeokbang_usersId" INTEGER,

    CONSTRAINT "bokdeokbang_blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bokdeokbang_categories" (
    "id" SERIAL NOT NULL,
    "blog_id" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bokdeokbang_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bokdeokbang_posts" (
    "id" SERIAL NOT NULL,
    "blog_id" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" INTEGER,
    "category_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bokdeokbang_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bokdeokbang_users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bokdeokbang_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bokdeokbang_blogs_subdomain_key" ON "bokdeokbang_blogs"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "bokdeokbang_users_email_key" ON "bokdeokbang_users"("email");

-- AddForeignKey
ALTER TABLE "bokdeokbang_blogs" ADD CONSTRAINT "bokdeokbang_blogs_bokdeokbang_usersId_fkey" FOREIGN KEY ("bokdeokbang_usersId") REFERENCES "bokdeokbang_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bokdeokbang_categories" ADD CONSTRAINT "bokdeokbang_categories_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "bokdeokbang_blogs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bokdeokbang_posts" ADD CONSTRAINT "bokdeokbang_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "bokdeokbang_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bokdeokbang_posts" ADD CONSTRAINT "bokdeokbang_posts_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "bokdeokbang_blogs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bokdeokbang_posts" ADD CONSTRAINT "bokdeokbang_posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "bokdeokbang_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
