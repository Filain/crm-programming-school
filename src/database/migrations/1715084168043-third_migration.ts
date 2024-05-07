import { MigrationInterface, QueryRunner } from "typeorm";

export class ThirdMigration1715084168043 implements MigrationInterface {
    name = 'ThirdMigration1715084168043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` ADD \`manager_write\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`manager_write\``);
    }

}
