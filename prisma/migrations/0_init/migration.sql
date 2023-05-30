-- CreateTable
CREATE TABLE "academy" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "academy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "academy_id" UUID NOT NULL,

    CONSTRAINT "coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communication" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "sender_id" UUID NOT NULL,
    "receiver_id" UUID NOT NULL,
    "message" VARCHAR NOT NULL,

    CONSTRAINT "communication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parent" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "player_id" UUID NOT NULL,

    CONSTRAINT "parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance_data" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "player_id" UUID NOT NULL,
    "data" VARCHAR NOT NULL,

    CONSTRAINT "performance_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "academy_id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_task" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "player_id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,
    "task_name" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,

    CONSTRAINT "training_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "roq_user_id" VARCHAR NOT NULL,
    "tenant_id" VARCHAR NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "academy" ADD CONSTRAINT "academy_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coach" ADD CONSTRAINT "coach_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coach" ADD CONSTRAINT "coach_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "communication" ADD CONSTRAINT "communication_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "communication" ADD CONSTRAINT "communication_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parent" ADD CONSTRAINT "parent_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parent" ADD CONSTRAINT "parent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "performance_data" ADD CONSTRAINT "performance_data_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "training_task" ADD CONSTRAINT "training_task_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "training_task" ADD CONSTRAINT "training_task_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

