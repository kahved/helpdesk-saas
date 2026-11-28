-- Up Migration
ALTER TABLE tickets
    ADD COLUMN external_source TEXT,
    ADD COLUMN external_id TEXT,
    ADD CONSTRAINT tickets_external_reference_pair_check
        CHECK ((external_source IS NULL) = (external_id IS NULL)),
    ADD CONSTRAINT tickets_external_reference_unique
        UNIQUE (external_source, external_id);

-- Down Migration
ALTER TABLE tickets
    DROP CONSTRAINT tickets_external_reference_unique,
    DROP CONSTRAINT tickets_external_reference_pair_check,
    DROP COLUMN external_id,
    DROP COLUMN external_source;