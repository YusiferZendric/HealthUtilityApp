from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import Appointment, User
from datetime import datetime

appointment_bp = Blueprint('appointment', __name__)

@appointment_bp.route('/schedule', methods=['POST'])
@jwt_required()
def schedule_appointment():
    current_user = get_jwt_identity()
    data = request.get_json()
    doctor_id = data.get('doctor_id')
    appointment_time = data.get('appointment_time')  # Expecting ISO format
    
    appointment = Appointment(
        patient_id=current_user['id'],
        doctor_id=doctor_id,
        appointment_time=datetime.fromisoformat(appointment_time)
    )
    
    db.session.add(appointment)
    db.session.commit()
    
    return jsonify({'message': 'Appointment scheduled successfully'}), 201

@appointment_bp.route('/my-appointments', methods=['GET'])
@jwt_required()
def my_appointments():
    current_user = get_jwt_identity()
    role = current_user['role']
    
    if role == 'patient':
        appointments = Appointment.query.filter_by(patient_id=current_user['id']).all()
    elif role == 'doctor':
        appointments = Appointment.query.filter_by(doctor_id=current_user['id']).all()
    else:
        return jsonify({'message': 'Invalid role'}), 400
    
    output = []
    for appt in appointments:
        patient = User.query.get(appt.patient_id)
        doctor = User.query.get(appt.doctor_id)
        appt_data = {
            'id': appt.id,
            'patient': patient.username,
            'doctor': doctor.username,
            'appointment_time': appt.appointment_time,
            'status': appt.status,
            'created_at': appt.created_at
        }
        output.append(appt_data)
    
    return jsonify({'appointments': output}), 200