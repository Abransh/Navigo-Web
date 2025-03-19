import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1742343378795 implements MigrationInterface {
    name = 'InitialSchema1742343378795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('pending', 'completed', 'failed', 'refunded')`);
        await queryRunner.query(`CREATE TYPE "public"."payments_method_enum" AS ENUM('credit_card', 'debit_card', 'upi', 'wallet', 'bank_transfer')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'pending', "method" "public"."payments_method_enum" NOT NULL, "transactionId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bookingId" uuid, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "comment" text NOT NULL, "isVisible" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bookingId" uuid, "reviewerId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "location" character varying, "notes" text, "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'pending', "totalAmount" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "touristId" uuid, "companionId" uuid, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bio" character varying NOT NULL, "languages" text NOT NULL, "specialties" text NOT NULL, "hourlyRate" numeric(10,2) NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "isAvailable" boolean NOT NULL DEFAULT true, "averageRating" numeric(3,2) NOT NULL DEFAULT '0', "totalReviews" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_f171b06eba4f8b84a44a29fa5b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "providerId" character varying NOT NULL, "accessToken" character varying, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b07773de7651b6e0d11719b971a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('tourist', 'companion', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bio" text, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'tourist', "nationality" character varying, "profilePicture" character varying, "isVerified" boolean NOT NULL DEFAULT false, "verificationToken" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" uuid, "recipientId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "password_resets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "token" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4816377aa98211c1de34469e742" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "destinations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text NOT NULL, "image" character varying NOT NULL, "highlights" text, "attractions" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_69c5e8db964dcb83d3a0640f3c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_1ead3dc5d71db0ea822706e389d" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_c357057587a1c2afae453515bf6" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_f9238c3e3739dc40322f577fc46" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_78a18a5704f657786240cbe82eb" FOREIGN KEY ("touristId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_08068abfd15e895f456f6d6847a" FOREIGN KEY ("companionId") REFERENCES "companions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companions" ADD CONSTRAINT "FK_693745714c0cb25a146b8568b2d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "social_profiles" ADD CONSTRAINT "FK_aed72a9f44fa82046910616bdb0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_f548818d46a1315d4e1d5e62da5" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_f548818d46a1315d4e1d5e62da5"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "social_profiles" DROP CONSTRAINT "FK_aed72a9f44fa82046910616bdb0"`);
        await queryRunner.query(`ALTER TABLE "companions" DROP CONSTRAINT "FK_693745714c0cb25a146b8568b2d"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_08068abfd15e895f456f6d6847a"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_78a18a5704f657786240cbe82eb"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_f9238c3e3739dc40322f577fc46"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_c357057587a1c2afae453515bf6"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_1ead3dc5d71db0ea822706e389d"`);
        await queryRunner.query(`DROP TABLE "destinations"`);
        await queryRunner.query(`DROP TABLE "password_resets"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "social_profiles"`);
        await queryRunner.query(`DROP TABLE "companions"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    }

}
