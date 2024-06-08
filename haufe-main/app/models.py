from .__init__ import db
from flask_login import UserMixin
from .__init__ import app

with app.app_context():
    db.create_all()

class Reccomandation(db.Model):
    __tablename__ = 'reccomandation'
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(120), unique=False, nullable=False)
    image = db.Column(db.String(120), unique=False, nullable=False)
    link = db.Column(db.String(120), unique=False, nullable=False)
    rating = db.Column(db.Float(), unique=False, nullable=False)
    viewed_at = db.Column(db.String(120), unique=False, nullable=False)

    def __init__(self, link, message, viewedAt, rating, poster):
        self.message = message
        self.image = poster
        self.link = link
        self.rating = rating
        self.viewed_at = viewedAt

    def to_dict(self):
        return {
            'message': self.message,
            'poster': self.image,
            'link': self.link,
            'rating': self.rating,
            'viewed_at': self.viewed_at,
        }

    def saveToDB(self):
        db.session.add(self)
        db.session.commit()
        
    def deleteFromDB(self):
        db.session.delete(self)
        db.session.commit()


class Group(db.Model):
    __tablename__ = 'group'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    
    def __init__(self, name):
        self.name = name


    def saveToDB(self):
        db.session.add(self)
        db.session.commit()
        
    def deleteFromDB(self):
        db.session.delete(self)
        db.session.commit()

# group_members = db.Table('group_members',
#     db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
#     db.Column('group_id', db.Integer, db.ForeignKey('group.id'))
# )

# group_recommendations = db.Table('group_recommendations',
#     db.Column('recommendation_id', db.Integer, db.ForeignKey('recommendation.id')),
#     db.Column('group_id', db.Integer, db.ForeignKey('group.id'))
# )
    

class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def saveToDB(self):
        db.session.add(self)
        db.session.commit()
        
    def deleteFromDB(self):
        db.session.delete(self)
        db.session.commit()

