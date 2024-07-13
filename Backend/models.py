from datetime import datetime
from config import db

class Garden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    plants = db.relationship('Plant', backref='garden', lazy=True)

class Plant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date_planted = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    garden_id = db.Column(db.Integer, db.ForeignKey('garden.id'), nullable=False)
    comments = db.relationship('Comment', backref='plant', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    plant_id = db.Column(db.Integer, db.ForeignKey('plant.id'), nullable=False)