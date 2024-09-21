from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import PatientRecord

patient_bp = Blueprint('patient', __name__)

@patient_bp.route('/record', methods=['POST'])
@jwt_required()
def add_record():
    current_user = get_jwt_identity()
    data = request.get_json()
    blood_pressure = data.get('blood_pressure')
    cholesterol = data.get('cholesterol')
    
    new_record = PatientRecord(
        user_id=current_user['id'],
        blood_pressure=blood_pressure,
        cholesterol=cholesterol
    )
    
    db.session.add(new_record)
    db.session.commit()
    
    return jsonify({'message': 'Record added successfully'}), 201

@patient_bp.route('/record', methods=['GET'])
@jwt_required()
def get_records():
    current_user = get_jwt_identity()
    records = PatientRecord.query.filter_by(user_id=current_user['id']).all()
    
    output = []
    for record in records:
        record_data = {
            'id': record.id,
            'blood_pressure': record.blood_pressure,
            'cholesterol': record.cholesterol,
            'created_at': record.created_at
        }
        output.append(record_data)
    
    return jsonify({'records': output}), 200