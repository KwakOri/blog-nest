-- CreateTable
CREATE TABLE "apikeyper_tokens" (
    "id" SERIAL NOT NULL,
    "token_name" VARCHAR(30) NOT NULL,
    "token_description" VARCHAR(30) NOT NULL,
    "token_value" TEXT NOT NULL,
    "token_created_date" DATE,
    "token_expiry_date" DATE,
    "notification_option" VARCHAR(30),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "apikeyper_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apikeyper_users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "is_verified" BOOLEAN DEFAULT false,
    "device_token" TEXT,

    CONSTRAINT "apikeyper_users_pkey" PRIMARY KEY ("id")
);
