from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import pickle
import numpy as np

predict_bp = Blueprint('predict', __name__)

# Load the pre-trained model
with open('ml_models/readmission_model.pkl', 'rb') as f:
    model = pickle.load(f)

@predict_bp.route('/readmission', methods=['POST'])
@jwt_required()
def predict_readmission():
    data = request.get_json()
    # Example features; adjust based on your model
    features = [
        data.get('age'),
        data.get('blood_pressure'),
        data.get('cholesterol'),
        data.get('heart_rate')
    ]
    
    # Preprocess features as required by the model
    input_data = np.array(features).reshape(1, -1)
    
    prediction = model.predict(input_data)
    probability = model.predict_proba(input_data)[0][1]
    
    return jsonify({
        'readmission_risk': int(prediction[0]),
        'probability': float(probability)
    }), 200