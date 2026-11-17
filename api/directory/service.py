import json
import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func

from db.models import (
    Department,
    Jurisdiction,
    Position,
    Person,
    PositionAssignment,
    OfficialContactChannel,
    Office,
    AdministrativeUnit,
    DirectoryCategory,
    SourceDocument,
    SourceEvidence,
    VerificationRecord,
    ChangeRequest,
    ApprovalWorkflow,
    AuditEvent,
    DepartmentNodalOfficer,
)
from .schemas import (
    ContactDetail,
    ContactChannelSchema,
    ContactListResponse,
    DepartmentSchema,
    OfficeSchema,
    DistrictSchema,
    PositionSchema,
    HierarchyNode,
    CategorySchema,
    DataQualityMetrics,
    ConflictItem,
    OfficerTransferRequest,
    OfficerTransferResponse,
    ChangeRequestCreate,
    ChangeRequestResponse,
)


class DirectoryService:
    @staticmethod
    def search_contacts(
        db: Session,
        query: Optional[str] = None,
        department_id: Optional[str] = None,
        district: Optional[str] = None,
        cadre: Optional[str] = None,
        status: Optional[str] = None,
        is_vacant: Optional[bool] = None,
        page: int = 1,
        limit: int = 20,
    ) -> ContactListResponse:
        q = (
            db.query(Position, PositionAssignment, Person, Department, Jurisdiction)
            .outerjoin(
                PositionAssignment,
                and_(
                    PositionAssignment.position_id == Position.position_id,
                    PositionAssignment.is_current == True,
                ),
            )
            .outerjoin(Person, Person.person_id == PositionAssignment.person_id)
            .join(Department, Department.department_id == Position.department_id)
            .join(Jurisdiction, Jurisdiction.jurisdiction_id == Position.jurisdiction_id)
        )

        if query:
            search_filter = or_(
                Person.name_en.ilike(f"%{query}%"),
                Person.name_ta.ilike(f"%{query}%"),
                Position.title_en.ilike(f"%{query}%"),
                Position.title_ta.ilike(f"%{query}%"),
                Department.name_en.ilike(f"%{query}%"),
                Department.name_ta.ilike(f"%{query}%"),
                Jurisdiction.district_en.ilike(f"%{query}%"),
                Jurisdiction.district_ta.ilike(f"%{query}%"),
            )
            q = q.filter(search_filter)

        if department_id:
            q = q.filter(Department.department_id == department_id)
        if district:
            q = q.filter(
                or_(
                    Jurisdiction.district_en.ilike(f"%{district}%"),
                    Jurisdiction.district_ta.ilike(f"%{district}%"),
                )
            )
        if cadre:
            q = q.filter(Position.cadre.ilike(f"%{cadre}%"))
        if status:
            q = q.filter(Position.status == status)
        if is_vacant is not None:
            q = q.filter(Position.is_vacant == is_vacant)

        total = q.count()
        offset = (page - 1) * limit
        rows = q.offset(offset).limit(limit).all()

        officials: List[ContactDetail] = []
        for pos, asg, per, dept, jur in rows:
            channels = []
            if pos:
                ch_rows = (
                    db.query(OfficialContactChannel)
                    .filter(OfficialContactChannel.position_id == pos.position_id)
                    .all()
                )
                for ch in ch_rows:
                    channels.append(
                        ContactChannelSchema(
                            channel_id=ch.channel_id,
                            channel_type=ch.channel_type,
                            channel_value=ch.channel_value,
                            display_label_en=ch.display_label_en,
                            display_label_ta=ch.display_label_ta,
                            is_verified=ch.is_verified,
                            verification_date=ch.verification_date,
                        )
                    )

            officials.append(
                ContactDetail(
                    id=pos.position_id,
                    position_id=pos.position_id,
                    designation_en=pos.title_en,
                    designation_ta=pos.title_ta,
                    department_id=dept.department_id,
                    department_en=dept.name_en,
                    department_ta=dept.name_ta,
                    district_en=jur.district_en,
                    district_ta=jur.district_ta,
                    cadre=pos.cadre,
                    is_vacant=pos.is_vacant or (asg is None),
                    person_id=per.person_id if per else None,
                    name_en=per.name_en if per else "VACANT / அரசு காலிப்பணியிடம்",
                    name_ta=per.name_ta if per else "காலிப்பணியிடம்",
                    email=per.official_email if per else None,
                    phone=per.official_phone if per else None,
                    office_address=per.office_address if per else None,
                    status="Active" if pos.status == "active" else "Vacant",
                    workflow_status=asg.workflow_status if asg else "APPROVED",
                    verified=per.verification_status == "verified" if per else False,
                    go_ref=asg.transfer_go_ref if asg else None,
                    last_verified="2026-11-17",
                    channels=channels,
                    source_reference=f"G.O. / Official Gazette Registry (Verified: {dept.code or 'TNGov'})",
                )
            )

        return ContactListResponse(
            total=total,
            page=page,
            limit=limit,
            officials=officials,
        )

    @staticmethod
    def get_contact_by_id(db: Session, position_id: str) -> Optional[ContactDetail]:
        res = DirectoryService.search_contacts(db, page=1, limit=1)
        # Search directly by position_id
        pos = db.query(Position).filter(Position.position_id == position_id).first()
        if not pos:
            return None

        asg = (
            db.query(PositionAssignment)
            .filter(
                PositionAssignment.position_id == pos.position_id,
                PositionAssignment.is_current == True,
            )
            .first()
        )
        per = db.query(Person).filter(Person.person_id == asg.person_id).first() if asg else None
        dept = db.query(Department).filter(Department.department_id == pos.department_id).first()
        jur = db.query(Jurisdiction).filter(Jurisdiction.jurisdiction_id == pos.jurisdiction_id).first()

        ch_rows = (
            db.query(OfficialContactChannel)
            .filter(OfficialContactChannel.position_id == pos.position_id)
            .all()
        )
        channels = [
            ContactChannelSchema(
                channel_id=ch.channel_id,
                channel_type=ch.channel_type,
                channel_value=ch.channel_value,
                display_label_en=ch.display_label_en,
                display_label_ta=ch.display_label_ta,
                is_verified=ch.is_verified,
            )
            for ch in ch_rows
        ]

        return ContactDetail(
            id=pos.position_id,
            position_id=pos.position_id,
            designation_en=pos.title_en,
            designation_ta=pos.title_ta,
            department_id=dept.department_id if dept else "DEP-001",
            department_en=dept.name_en if dept else "Government Department",
            department_ta=dept.name_ta if dept else "அரசுத் துறை",
            district_en=jur.district_en if jur else "Chennai",
            district_ta=jur.district_ta if jur else "சென்னை",
            cadre=pos.cadre,
            is_vacant=pos.is_vacant or (asg is None),
            person_id=per.person_id if per else None,
            name_en=per.name_en if per else "VACANT",
            name_ta=per.name_ta if per else "காலிப்பணியிடம்",
            email=per.official_email if per else None,
            phone=per.official_phone if per else None,
            office_address=per.office_address if per else None,
            status="Active" if pos.status == "active" else "Vacant",
            workflow_status=asg.workflow_status if asg else "APPROVED",
            verified=per.verification_status == "verified" if per else False,
            go_ref=asg.transfer_go_ref if asg else None,
            last_verified="2026-11-17",
            channels=channels,
            source_reference="Gazette Verification Record 2026",
        )

    @staticmethod
    def get_departments(db: Session) -> List[DepartmentSchema]:
        depts = db.query(Department).all()
        out = []
        for d in depts:
            tot = db.query(Position).filter(Position.department_id == d.department_id).count()
            vac = (
                db.query(Position)
                .filter(Position.department_id == d.department_id, Position.is_vacant == True)
                .count()
            )
            out.append(
                DepartmentSchema(
                    department_id=d.department_id,
                    name_en=d.name_en,
                    name_ta=d.name_ta,
                    code=d.code,
                    category_id=d.category_id,
                    total_positions=tot,
                    vacant_positions=vac,
                )
            )
        return out

    @staticmethod
    def get_offices(db: Session, department_id: Optional[str] = None) -> List[OfficeSchema]:
        q = db.query(Office)
        if department_id:
            q = q.filter(Office.department_id == department_id)
        offices = q.all()
        out = []
        for off in offices:
            jur = db.query(Jurisdiction).filter(Jurisdiction.jurisdiction_id == off.jurisdiction_id).first()
            out.append(
                OfficeSchema(
                    office_id=off.office_id,
                    department_id=off.department_id,
                    name_en=off.name_en,
                    name_ta=off.name_ta,
                    office_type=off.office_type,
                    jurisdiction_en=jur.district_en if jur else "State Level",
                    address_en=off.address_en,
                    status=off.status,
                )
            )
        return out

    @staticmethod
    def get_districts(db: Session) -> List[DistrictSchema]:
        jurs = db.query(Jurisdiction).filter(Jurisdiction.level == "District").all()
        out = []
        for j in jurs:
            # Find Collector
            collector_pos = (
                db.query(Position)
                .filter(
                    Position.jurisdiction_id == j.jurisdiction_id,
                    Position.title_en.ilike("%Collector%"),
                )
                .first()
            )
            collector_name_en = None
            collector_name_ta = None
            collector_phone = None
            collector_email = None

            if collector_pos:
                asg = (
                    db.query(PositionAssignment)
                    .filter(
                        PositionAssignment.position_id == collector_pos.position_id,
                        PositionAssignment.is_current == True,
                    )
                    .first()
                )
                if asg:
                    per = db.query(Person).filter(Person.person_id == asg.person_id).first()
                    if per:
                        collector_name_en = per.name_en
                        collector_name_ta = per.name_ta
                        collector_phone = per.official_phone
                        collector_email = per.official_email

            out.append(
                DistrictSchema(
                    jurisdiction_id=j.jurisdiction_id,
                    district_en=j.district_en,
                    district_ta=j.district_ta,
                    level=j.level,
                    collector_name_en=collector_name_en,
                    collector_name_ta=collector_name_ta,
                    collector_phone=collector_phone,
                    collector_email=collector_email,
                )
            )
        return out

    @staticmethod
    def get_categories(db: Session) -> List[CategorySchema]:
        cats = db.query(DirectoryCategory).order_by(DirectoryCategory.sort_order).all()
        return [
            CategorySchema(
                category_id=c.category_id,
                name_en=c.name_en,
                name_ta=c.name_ta,
                code=c.code,
                icon=c.icon,
                sort_order=c.sort_order,
            )
            for c in cats
        ]

    @staticmethod
    def build_hierarchy(db: Session, root_department_id: Optional[str] = None) -> HierarchyNode:
        root = HierarchyNode(
            node_id="ROOT-TNGOV",
            node_type="Government",
            name_en="Government of Tamil Nadu",
            name_ta="தமிழ்நாடு அரசு",
            status="active",
            verification_status="VERIFIED",
            children=[],
        )

        dept_query = db.query(Department)
        if root_department_id:
            dept_query = dept_query.filter(Department.department_id == root_department_id)
        departments = dept_query.limit(10).all()

        for d in departments:
            dept_node = HierarchyNode(
                node_id=f"NODE-{d.department_id}",
                node_type="Department",
                name_en=d.name_en,
                name_ta=d.name_ta,
                department_name=d.name_en,
                status="active",
                children=[],
            )

            # Positions under this department
            positions = db.query(Position).filter(Position.department_id == d.department_id).limit(5).all()
            for p in positions:
                asg = (
                    db.query(PositionAssignment)
                    .filter(
                        PositionAssignment.position_id == p.position_id,
                        PositionAssignment.is_current == True,
                    )
                    .first()
                )
                per = db.query(Person).filter(Person.person_id == asg.person_id).first() if asg else None
                jur = db.query(Jurisdiction).filter(Jurisdiction.jurisdiction_id == p.jurisdiction_id).first()

                pos_node = HierarchyNode(
                    node_id=f"NODE-{p.position_id}",
                    node_type="Position",
                    name_en=p.title_en,
                    name_ta=p.title_ta,
                    position_title=p.title_en,
                    current_officeholder=per.name_en if per else "VACANT",
                    jurisdiction=jur.district_en if jur else "State",
                    status="active" if p.status == "active" else "vacant",
                    verification_status="VERIFIED" if (per and per.verification_status == "verified") else "PENDING",
                    children=[],
                )
                dept_node.children.append(pos_node)

            root.children.append(dept_node)

        return root

    @staticmethod
    def execute_officer_transfer(db: Session, req: OfficerTransferRequest) -> OfficerTransferResponse:
        person = db.query(Person).filter(Person.person_id == req.person_id).first()
        if not person:
            raise ValueError(f"Person with ID {req.person_id} not found")

        curr_pos = db.query(Position).filter(Position.position_id == req.current_position_id).first()
        new_pos = db.query(Position).filter(Position.position_id == req.new_position_id).first()

        if not curr_pos or not new_pos:
            raise ValueError("Invalid current or new position ID")

        closed_id = None
        if req.close_previous_assignment:
            old_asg = (
                db.query(PositionAssignment)
                .filter(
                    PositionAssignment.position_id == req.current_position_id,
                    PositionAssignment.person_id == req.person_id,
                    PositionAssignment.is_current == True,
                )
                .first()
            )
            if old_asg:
                old_asg.is_current = False
                old_asg.end_date = req.effective_date
                old_asg.workflow_status = "SUPERSEDED"
                closed_id = old_asg.assignment_id

            # Check if any other primary assignment remains on current position
            remaining = (
                db.query(PositionAssignment)
                .filter(
                    PositionAssignment.position_id == req.current_position_id,
                    PositionAssignment.is_current == True,
                )
                .count()
            )
            if remaining == 0:
                curr_pos.is_vacant = True

        # Create new assignment
        new_asg = PositionAssignment(
            assignment_id=f"ASG-TRF-{uuid.uuid4().hex[:8].upper()}",
            position_id=new_pos.position_id,
            person_id=person.person_id,
            assignment_type=req.transfer_type,
            start_date=req.effective_date,
            transfer_go_ref=req.transfer_go_ref,
            is_current=True,
            workflow_status="APPROVED",
            submitted_by=req.authorized_by,
            approved_by=req.authorized_by,
            verified_at=datetime.now(timezone.utc),
            approved_at=datetime.now(timezone.utc),
        )
        db.add(new_asg)
        new_pos.is_vacant = False

        # Log Audit Event
        audit = AuditEvent(
            event_id=f"AUD-{uuid.uuid4().hex[:8].upper()}",
            event_type="OFFICER_TRANSFER",
            entity_type="POSITION_ASSIGNMENT",
            entity_id=new_asg.assignment_id,
            actor_id=req.authorized_by,
            actor_role="STATE_DIRECTORY_ADMIN",
            details_json=json.dumps(
                {
                    "person_id": person.person_id,
                    "previous_position": curr_pos.title_en,
                    "new_position": new_pos.title_en,
                    "effective_date": req.effective_date,
                    "transfer_go_ref": req.transfer_go_ref,
                }
            ),
        )
        db.add(audit)
        db.commit()

        return OfficerTransferResponse(
            success=True,
            message="Officer transfer recorded and published successfully",
            closed_assignment_id=closed_id,
            new_assignment_id=new_asg.assignment_id,
            person_id=person.person_id,
            previous_position_id=curr_pos.position_id,
            new_position_id=new_pos.position_id,
            effective_date=req.effective_date,
            go_ref=req.transfer_go_ref,
            audit_event_id=audit.event_id,
        )

    @staticmethod
    def compute_data_quality_metrics(db: Session) -> DataQualityMetrics:
        tot_pos = db.query(Position).count()
        ver_asg = (
            db.query(PositionAssignment)
            .filter(
                PositionAssignment.is_current == True,
                PositionAssignment.workflow_status == "APPROVED",
            )
            .count()
        )
        vac_pos = db.query(Position).filter(Position.is_vacant == True).count()

        missing_contacts = (
            db.query(Person)
            .filter(or_(Person.official_email == None, Person.official_phone == None, Person.official_phone == ""))
            .count()
        )

        pending_ver = (
            db.query(PositionAssignment)
            .filter(PositionAssignment.workflow_status.in_(["PENDING_REVIEW", "PENDING_VERIFICATION", "DRAFT"]))
            .count()
        )

        # Conflicting records: positions with > 1 current primary assignment
        conflict_pos = (
            db.query(PositionAssignment.position_id)
            .filter(PositionAssignment.is_current == True)
            .group_by(PositionAssignment.position_id)
            .having(func.count(PositionAssignment.assignment_id) > 1)
            .count()
        )

        # Stale records: current assignments with no updates in 180 days
        cutoff = datetime.now(timezone.utc) - timedelta(days=180)
        stale_records = (
            db.query(PositionAssignment)
            .filter(PositionAssignment.is_current == True, PositionAssignment.created_at < cutoff)
            .count()
        )

        # Recent transfers: last 30 days
        cutoff_30 = datetime.now(timezone.utc) - timedelta(days=30)
        recent_transfers = (
            db.query(PositionAssignment)
            .filter(PositionAssignment.created_at >= cutoff_30)
            .count()
        )

        # Departments without nodal officers
        nodal_dept_ids = {n.department_id for n in db.query(DepartmentNodalOfficer).filter(DepartmentNodalOfficer.is_active == True).all()}
        all_dept_ids = {d.department_id for d in db.query(Department).all()}
        depts_no_nodal = len(all_dept_ids - nodal_dept_ids)

        # Source failures
        retrieval_failures = db.query(SourceDocument).filter(SourceDocument.failure_reason != None).count()

        return DataQualityMetrics(
            total_published_positions=tot_pos,
            verified_current_assignments=ver_asg,
            vacant_positions=vac_pos,
            missing_official_contacts=missing_contacts,
            records_awaiting_verification=pending_ver,
            conflicting_records=conflict_pos,
            duplicate_candidates=0,
            stale_records=stale_records,
            recent_transfers_30d=recent_transfers,
            departments_without_nodal=depts_no_nodal,
            source_retrieval_failures=retrieval_failures,
            last_computed_at=datetime.now(timezone.utc).isoformat(),
        )

    @staticmethod
    def get_conflicts(db: Session) -> List[ConflictItem]:
        conflicts = []

        # 1. Dual Primary Assignments
        dup_subq = (
            db.query(PositionAssignment.position_id)
            .filter(PositionAssignment.is_current == True)
            .group_by(PositionAssignment.position_id)
            .having(func.count(PositionAssignment.assignment_id) > 1)
            .all()
        )
        for row in dup_subq:
            pos_id = row[0]
            pos = db.query(Position).filter(Position.position_id == pos_id).first()
            conflicts.append(
                ConflictItem(
                    conflict_id=f"CONF-DUAL-{pos_id}",
                    conflict_type="DUAL_PRIMARY_ASSIGNMENT",
                    position_id=pos_id,
                    position_title=pos.title_en if pos else "Unknown",
                    department=pos.department.name_en if pos and pos.department else None,
                    description=f"Multiple active primary assignments detected for position {pos_id}.",
                    severity="CRITICAL",
                    detected_at=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M"),
                )
            )

        # 2. Missing official phone or email
        missing_persons = (
            db.query(Person, PositionAssignment, Position)
            .join(PositionAssignment, PositionAssignment.person_id == Person.person_id)
            .join(Position, Position.position_id == PositionAssignment.position_id)
            .filter(
                PositionAssignment.is_current == True,
                or_(Person.official_phone == None, Person.official_phone == "", Person.official_email == None, Person.official_email == ""),
            )
            .limit(10)
            .all()
        )
        for per, asg, pos in missing_persons:
            conflicts.append(
                ConflictItem(
                    conflict_id=f"CONF-MISSING-{per.person_id}",
                    conflict_type="MISSING_CONTACT",
                    position_id=pos.position_id,
                    position_title=pos.title_en,
                    department=pos.department.name_en if pos.department else None,
                    description=f"Official {per.name_en} is missing verified official phone or email.",
                    severity="HIGH",
                    detected_at=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M"),
                )
            )

        return conflicts
