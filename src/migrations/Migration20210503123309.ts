import { Migration } from '@mikro-orm/migrations';

export class Migration20210503123309 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" rename column "email" to "email_id";');


    this.addSql('alter table "user" drop constraint "user_email_unique";');

    this.addSql('alter table "user" add constraint "user_email_id_unique" unique ("email_id");');
  }

}
