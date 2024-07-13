from flask import request, jsonify
from config import app, db
from models import Garden, Plant, Comment
from datetime import datetime

# Create a garden
@app.route('/garden', methods=['POST'])
def create_garden():
    data = request.json
    name = data.get('name')
    new_garden = Garden(name=name)
    db.session.add(new_garden)
    db.session.commit()
    return jsonify({"message": "Garden created successfully"}), 201

# Get all gardens
@app.route('/gardens', methods=['GET'])
def get_gardens():
    gardens = Garden.query.all()
    output = []
    for garden in gardens:
        garden_data = {'id': garden.id, 'name': garden.name}
        output.append(garden_data)
    return jsonify({'gardens': output})

# Get a specific garden
@app.route('/garden/<int:garden_id>', methods=['GET'])
def get_garden(garden_id):
    garden = Garden.query.get_or_404(garden_id)
    return jsonify({'id': garden.id, 'name': garden.name})

# Update a garden
@app.route('/garden/<int:garden_id>', methods=['PUT'])
def update_garden(garden_id):
    garden = Garden.query.get_or_404(garden_id)
    data = request.json
    garden.name = data.get('name', garden.name)
    db.session.commit()
    return jsonify({"message": "Garden updated successfully"})

# Delete a garden
@app.route('/garden/<int:garden_id>', methods=['DELETE'])
def delete_garden(garden_id):
    garden = Garden.query.get_or_404(garden_id)
    db.session.delete(garden)
    db.session.commit()
    return jsonify({"message": "Garden deleted successfully"})

# Create a plant associated with a garden
@app.route('/plant', methods=['POST'])
def create_plant():
    data = request.json
    name = data.get('name')
    date_planted_str = data.get('date_planted')
    
    try:
        date_planted = datetime.strptime(date_planted_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Date should be in YYYY-MM-DD format."}), 400
    
    garden_id = data.get('garden_id')
    new_plant = Plant(name=name, date_planted=date_planted, garden_id=garden_id)
    db.session.add(new_plant)
    db.session.commit()
    return jsonify({"message": "Plant created successfully"}), 201

# Get a specific plant
@app.route('/plant/<int:plant_id>', methods=['GET'])
def get_plant(plant_id):
    plant = Plant.query.get_or_404(plant_id)
    return jsonify({'id': plant.id, 'name': plant.name, 'date_planted': plant.date_planted.strftime('%Y-%m-%d')})

# Update a plant
@app.route('/plant/<int:plant_id>', methods=['PUT'])
def update_plant(plant_id):
    plant = Plant.query.get_or_404(plant_id)
    data = request.json
    plant.name = data.get('name', plant.name)
    date_planted_str = data.get('date_planted')
    
    if date_planted_str:
        try:
            plant.date_planted = datetime.strptime(date_planted_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"error": "Invalid date format. Date should be in YYYY-MM-DD format."}), 400
    
    db.session.commit()
    return jsonify({"message": "Plant updated successfully"})

# Delete a plant
@app.route('/plant/<int:plant_id>', methods=['DELETE'])
def delete_plant(plant_id):
    plant = Plant.query.get_or_404(plant_id)
    db.session.delete(plant)
    db.session.commit()
    return jsonify({"message": "Plant deleted successfully"})

# Add a comment to a plant
@app.route('/comment', methods=['POST'])
def add_comment():
    data = request.json
    text = data.get('text')
    plant_id = data.get('plant_id')
    new_comment = Comment(text=text, plant_id=plant_id)
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({"message": "Comment added successfully"}), 201

# Get comments for a plant
@app.route('/comments/<int:plant_id>', methods=['GET'])
def get_comments(plant_id):
    comments = Comment.query.filter_by(plant_id=plant_id).all()
    output = []
    for comment in comments:
        comment_data = {'id': comment.id, 'text': comment.text}
        output.append(comment_data)
    return jsonify({'comments': output})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)