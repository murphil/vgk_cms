let _ = require('../const.yml.json').SCHEMA.WORKFLOW
let __ = require('../const.yml.json').SCHEMA.USER
exports.up = async function(knex, Promise) {
  await knex.raw(`
                  CREATE OR REPLACE FUNCTION notify_mail_of_guest() RETURNS TRIGGER AS $body$
                  DECLARE rec record;
                  BEGIN
                    IF (TG_OP = 'INSERT') THEN
                      SELECT TG_OP TG_OP, NEW.type, NEW.content, NEW.created_at, NEW.updated_at, NEW.attributes INTO rec
                      WHERE NEW.from_id ISNULL;
                      PERFORM pg_notify('message_of_guest', row_to_json(rec)::TEXT);
                    END IF;
                    RETURN NEW;
                  END;
                    $body$ LANGUAGE plpgsql;
                  
                  CREATE TRIGGER MESSAGE_OF_GUEST_TRIGGER
                    AFTER INSERT ON mail
                    FOR EACH ROW EXECUTE PROCEDURE notify_mail_of_guest();
                  `)
};

exports.down = async function(knex, Promise) {
  await knex.raw(`
                 DROP TRIGGER MESSAGE_OF_GUEST_TRIGGER ON mail;
                 DROP FUNCTION notify_mail_of_guest();
                 `)
};
