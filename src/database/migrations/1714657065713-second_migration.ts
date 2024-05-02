import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1714657065713 implements MigrationInterface {
    name = 'SecondMigration1714657065713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`manager\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`group\` varchar(15) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`group\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`manager\``);
    }

}
