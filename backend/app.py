from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@db:5432/healthcare_db'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
    
    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    # Import and register blueprints
    from routes.auth import auth_bp
    from routes.patient import patient_bp
    from routes.appointment import appointment_bp
    from routes.predict import predict_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(patient_bp, url_prefix='/api/patient')
    app.register_blueprint(appointment_bp, url_prefix='/api/appointment')
    app.register_blueprint(predict_bp, url_prefix='/api/predict')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)