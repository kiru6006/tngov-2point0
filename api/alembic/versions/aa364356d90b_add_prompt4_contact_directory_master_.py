"""add_prompt4_contact_directory_master_schema

Revision ID: aa364356d90b
Revises: 75b99df315eb
Create Date: 2026-11-17 23:33:53.662608

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector


# revision identifiers, used by Alembic.
revision: str = 'aa364356d90b'
down_revision: Union[str, Sequence[str], None] = '75b99df315eb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    inspector = Inspector.from_engine(conn)
    tables = inspector.get_table_names()

    if 'audit_events' not in tables:
        op.create_table('audit_events',
            sa.Column('event_id', sa.String(length=64), nullable=False),
            sa.Column('event_type', sa.String(length=100), nullable=False),
            sa.Column('entity_type', sa.String(length=100), nullable=False),
            sa.Column('entity_id', sa.String(length=64), nullable=False),
            sa.Column('actor_id', sa.String(length=100), nullable=False),
            sa.Column('actor_role', sa.String(length=100), nullable=False),
            sa.Column('ip_address', sa.String(length=50), nullable=True),
            sa.Column('details_json', sa.Text(), nullable=True),
            sa.Column('timestamp', sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint('event_id')
        )

    if 'directory_categories' not in tables:
        op.create_table('directory_categories',
            sa.Column('category_id', sa.String(length=64), nullable=False),
            sa.Column('name_en', sa.String(length=255), nullable=False),
            sa.Column('name_ta', sa.String(length=255), nullable=False),
            sa.Column('code', sa.String(length=50), nullable=False),
            sa.Column('icon', sa.String(length=50), nullable=True),
            sa.Column('sort_order', sa.Integer(), nullable=True),
            sa.Column('is_active', sa.Boolean(), nullable=True),
            sa.PrimaryKeyConstraint('category_id'),
            sa.UniqueConstraint('code')
        )

    if 'source_documents' not in tables:
        op.create_table('source_documents',
            sa.Column('source_id', sa.String(length=64), nullable=False),
            sa.Column('org_name', sa.String(length=255), nullable=False),
            sa.Column('source_url', sa.String(length=500), nullable=False),
            sa.Column('source_type', sa.String(length=100), nullable=False),
            sa.Column('data_category', sa.String(length=100), nullable=False),
            sa.Column('retrieval_method', sa.String(length=100), nullable=True),
            sa.Column('retrieval_timestamp', sa.DateTime(), nullable=True),
            sa.Column('publication_date', sa.String(length=50), nullable=True),
            sa.Column('content_hash', sa.String(length=128), nullable=True),
            sa.Column('verification_status', sa.String(length=50), nullable=True),
            sa.Column('last_successful_retrieval', sa.DateTime(), nullable=True),
            sa.Column('failure_reason', sa.Text(), nullable=True),
            sa.Column('responsible_owner', sa.String(length=255), nullable=True),
            sa.PrimaryKeyConstraint('source_id')
        )

    if 'verification_records' not in tables:
        op.create_table('verification_records',
            sa.Column('verification_id', sa.String(length=64), nullable=False),
            sa.Column('entity_type', sa.String(length=50), nullable=False),
            sa.Column('entity_id', sa.String(length=64), nullable=False),
            sa.Column('verifier_user_id', sa.String(length=100), nullable=False),
            sa.Column('verifier_role', sa.String(length=100), nullable=False),
            sa.Column('verification_status', sa.String(length=50), nullable=False),
            sa.Column('notes', sa.Text(), nullable=True),
            sa.Column('verified_at', sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint('verification_id')
        )

    if 'source_evidence' not in tables:
        op.create_table('source_evidence',
            sa.Column('evidence_id', sa.String(length=64), nullable=False),
            sa.Column('source_id', sa.String(length=64), nullable=False),
            sa.Column('entity_type', sa.String(length=50), nullable=False),
            sa.Column('entity_id', sa.String(length=64), nullable=False),
            sa.Column('extracted_text', sa.Text(), nullable=False),
            sa.Column('page_number', sa.Integer(), nullable=True),
            sa.Column('bounding_box_json', sa.Text(), nullable=True),
            sa.Column('confidence_score', sa.Float(), nullable=True),
            sa.Column('created_at', sa.DateTime(), nullable=True),
            sa.ForeignKeyConstraint(['source_id'], ['source_documents.source_id'], ),
            sa.PrimaryKeyConstraint('evidence_id')
        )

    if 'offices' not in tables:
        op.create_table('offices',
            sa.Column('office_id', sa.String(length=64), nullable=False),
            sa.Column('department_id', sa.String(length=64), nullable=False),
            sa.Column('jurisdiction_id', sa.String(length=64), nullable=True),
            sa.Column('parent_office_id', sa.String(length=64), nullable=True),
            sa.Column('name_en', sa.String(length=255), nullable=False),
            sa.Column('name_ta', sa.String(length=255), nullable=False),
            sa.Column('office_type', sa.String(length=100), nullable=True),
            sa.Column('address_en', sa.String(length=500), nullable=True),
            sa.Column('address_ta', sa.String(length=500), nullable=True),
            sa.Column('status', sa.String(length=50), nullable=True),
            sa.ForeignKeyConstraint(['department_id'], ['departments.department_id'], ),
            sa.ForeignKeyConstraint(['jurisdiction_id'], ['jurisdictions.jurisdiction_id'], ),
            sa.ForeignKeyConstraint(['parent_office_id'], ['offices.office_id'], ),
            sa.PrimaryKeyConstraint('office_id')
        )

    if 'department_nodal_officers' not in tables:
        op.create_table('department_nodal_officers',
            sa.Column('nodal_id', sa.String(length=64), nullable=False),
            sa.Column('department_id', sa.String(length=64), nullable=False),
            sa.Column('person_id', sa.String(length=64), nullable=False),
            sa.Column('official_email', sa.String(length=255), nullable=False),
            sa.Column('official_phone', sa.String(length=50), nullable=True),
            sa.Column('role', sa.String(length=50), nullable=True),
            sa.Column('is_active', sa.Boolean(), nullable=True),
            sa.ForeignKeyConstraint(['department_id'], ['departments.department_id'], ),
            sa.ForeignKeyConstraint(['person_id'], ['persons.person_id'], ),
            sa.PrimaryKeyConstraint('nodal_id')
        )

    if 'administrative_units' not in tables:
        op.create_table('administrative_units',
            sa.Column('unit_id', sa.String(length=64), nullable=False),
            sa.Column('office_id', sa.String(length=64), nullable=False),
            sa.Column('unit_name_en', sa.String(length=255), nullable=False),
            sa.Column('unit_name_ta', sa.String(length=255), nullable=False),
            sa.Column('unit_type', sa.String(length=100), nullable=True),
            sa.ForeignKeyConstraint(['office_id'], ['offices.office_id'], ),
            sa.PrimaryKeyConstraint('unit_id')
        )

    if 'change_requests' not in tables:
        op.create_table('change_requests',
            sa.Column('request_id', sa.String(length=64), nullable=False),
            sa.Column('change_type', sa.String(length=50), nullable=False),
            sa.Column('department_id', sa.String(length=64), nullable=False),
            sa.Column('position_id', sa.String(length=64), nullable=True),
            sa.Column('person_id', sa.String(length=64), nullable=True),
            sa.Column('payload_json', sa.Text(), nullable=False),
            sa.Column('effective_date', sa.String(length=50), nullable=False),
            sa.Column('go_reference', sa.String(length=100), nullable=False),
            sa.Column('status', sa.String(length=50), nullable=True),
            sa.Column('requested_by', sa.String(length=100), nullable=False),
            sa.Column('created_at', sa.DateTime(), nullable=True),
            sa.Column('updated_at', sa.DateTime(), nullable=True),
            sa.ForeignKeyConstraint(['department_id'], ['departments.department_id'], ),
            sa.ForeignKeyConstraint(['person_id'], ['persons.person_id'], ),
            sa.ForeignKeyConstraint(['position_id'], ['positions.position_id'], ),
            sa.PrimaryKeyConstraint('request_id')
        )

    if 'official_contact_channels' not in tables:
        op.create_table('official_contact_channels',
            sa.Column('channel_id', sa.String(length=64), nullable=False),
            sa.Column('position_id', sa.String(length=64), nullable=True),
            sa.Column('office_id', sa.String(length=64), nullable=True),
            sa.Column('channel_type', sa.String(length=50), nullable=False),
            sa.Column('channel_value', sa.String(length=255), nullable=False),
            sa.Column('display_label_en', sa.String(length=255), nullable=True),
            sa.Column('display_label_ta', sa.String(length=255), nullable=True),
            sa.Column('is_verified', sa.Boolean(), nullable=True),
            sa.Column('verification_date', sa.String(length=50), nullable=True),
            sa.ForeignKeyConstraint(['office_id'], ['offices.office_id'], ),
            sa.ForeignKeyConstraint(['position_id'], ['positions.position_id'], ),
            sa.PrimaryKeyConstraint('channel_id')
        )

    if 'reporting_relationships' not in tables:
        op.create_table('reporting_relationships',
            sa.Column('rel_id', sa.String(length=64), nullable=False),
            sa.Column('superior_position_id', sa.String(length=64), nullable=False),
            sa.Column('subordinate_position_id', sa.String(length=64), nullable=False),
            sa.Column('relationship_type', sa.String(length=50), nullable=True),
            sa.Column('effective_from', sa.String(length=50), nullable=False),
            sa.Column('effective_to', sa.String(length=50), nullable=True),
            sa.Column('is_active', sa.Boolean(), nullable=True),
            sa.ForeignKeyConstraint(['subordinate_position_id'], ['positions.position_id'], ),
            sa.ForeignKeyConstraint(['superior_position_id'], ['positions.position_id'], ),
            sa.PrimaryKeyConstraint('rel_id')
        )

    if 'approval_workflows' not in tables:
        op.create_table('approval_workflows',
            sa.Column('workflow_id', sa.String(length=64), nullable=False),
            sa.Column('request_id', sa.String(length=64), nullable=False),
            sa.Column('step_number', sa.Integer(), nullable=True),
            sa.Column('assigned_role', sa.String(length=100), nullable=False),
            sa.Column('action_taken', sa.String(length=50), nullable=False),
            sa.Column('actor_id', sa.String(length=100), nullable=False),
            sa.Column('comments', sa.Text(), nullable=True),
            sa.Column('action_timestamp', sa.DateTime(), nullable=True),
            sa.ForeignKeyConstraint(['request_id'], ['change_requests.request_id'], ),
            sa.PrimaryKeyConstraint('workflow_id')
        )

    # Columns check & batch alter
    dept_cols = [c['name'] for c in inspector.get_columns('departments')]
    if 'category_id' not in dept_cols:
        with op.batch_alter_table('departments') as batch_op:
            batch_op.add_column(sa.Column('category_id', sa.String(length=64), nullable=True))
            batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))
            batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))

    juris_cols = [c['name'] for c in inspector.get_columns('jurisdictions')]
    if 'taluk_en' not in juris_cols:
        with op.batch_alter_table('jurisdictions') as batch_op:
            batch_op.add_column(sa.Column('taluk_en', sa.String(length=255), nullable=True))
            batch_op.add_column(sa.Column('taluk_ta', sa.String(length=255), nullable=True))

    person_cols = [c['name'] for c in inspector.get_columns('persons')]
    if 'status' not in person_cols:
        with op.batch_alter_table('persons') as batch_op:
            batch_op.add_column(sa.Column('status', sa.String(length=50), nullable=True))
            batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))

    assign_cols = [c['name'] for c in inspector.get_columns('position_assignments')]
    if 'assignment_type' not in assign_cols:
        with op.batch_alter_table('position_assignments') as batch_op:
            batch_op.add_column(sa.Column('assignment_type', sa.String(length=50), nullable=True))
            batch_op.add_column(sa.Column('verified_by', sa.String(length=100), nullable=True))
            batch_op.add_column(sa.Column('verified_at', sa.DateTime(), nullable=True))
            batch_op.add_column(sa.Column('approved_at', sa.DateTime(), nullable=True))

    pos_cols = [c['name'] for c in inspector.get_columns('positions')]
    if 'office_id' not in pos_cols:
        with op.batch_alter_table('positions') as batch_op:
            batch_op.add_column(sa.Column('office_id', sa.String(length=64), nullable=True))
            batch_op.add_column(sa.Column('sanctioned_strength', sa.Integer(), nullable=True))
            batch_op.add_column(sa.Column('is_vacant', sa.Boolean(), nullable=True))


def downgrade() -> None:
    pass
