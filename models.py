# models.py
from flask_login import UserMixin
from . import db
from datetime import datetime
import datetime as dt
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
from flask_marshmallow import Marshmallow


class ciuser(UserMixin, db.Model, SerializerMixin):
    __tablename__ = "ciuser"
    id = db.Column('id', db.Integer, primary_key=True)
    firstname = db.Column('firstname', db.String(100), unique=True)
    lastname = db.Column('lastname', db.String(100), unique=True)
    username = db.Column('username', db.String(100), unique=True)
    password = db.Column('password', db.String(100))
    email = db.Column('email', db.String(1000))
    phone = db.Column('phone', db.String(1000))
    createdatstamp = db.Column('createdatstamp', db.DateTime,
                               default=datetime.utcnow)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username


class cicovidhospital(db.Model, SerializerMixin):
    __tablename__ = "cicovidhospital"
    id = db.Column('id', db.Integer, primary_key=True)
    hospitalname = db.Column('hospitalname', db.String(100), unique=True)
    address = db.Column('address', db.String(100), unique=True)
    workingtime = db.Column('workingtime', db.String(100), unique=True)
    covidprevention = db.Column('covidprevention', db.String(100))
    currentnumberofpatients = db.Column(
        'currentnumberofpatients', db.String(100))

    def __init__(self, hospitalname, address):
        self.hospitalname = hospitalname
        self.address = address

    def __repr__(self):
        return '<Hospital %r>' % self.hospitalname


class queryobject(object):
    @staticmethod
    def get_object_by_name_or_category(name=None, category=None):
        user = ciobject.query.filter((ciobject.objectname == name) | (
            ciobject.category == category)).first()
        return user.id if hasattr(user, 'id') else None


class ciobject(db.Model, SerializerMixin):
    __tablename__ = "ciobject"
    id = db.Column('id', db.Integer, primary_key=True)
    objectname = db.Column('objectname', db.String(500), unique=True)
    category = db.Column('category', db.String(500), unique=True)
    address = db.Column('address', db.String(500), unique=True)
    dailyinformation = db.Column(
        'dailyinformation', db.String(100), unique=True)
    seats = db.Column('seats', db.String(100), unique=True)
    menu = db.Column('menu', db.String(500), unique=True)
    workingtime = db.Column('workingtime', db.String(200))
    website = db.Column('website', db.String(200))
    rest = db.Column('rest', db.String(500))
    createdatstamp = db.Column('createdatstamp', db.DateTime,
                               default=datetime.utcnow)

    def __init__(self, objectname, address):
        self.objectname = objectname
        self.address = address

    def __iter__(self):
        for key in self.objectname:
            yield (key, 'Object name {}'.format(key))
        for key in self.category:
            yield (key, 'Category {}'.format(key))

    def serialize(self):
        return {
            'objectname': self.objectname,
            'category': self.category,
            'address': self.address,
            'dailyinformation': self.dailyinformation,
            'seats': self.seats,
            'menu': self.menu,
            'workingtime': self.workingtime,
            'website': self.website,
            'rest': self.rest
        }

    def __repr__(self):
        return '<Object %r>' % self.objectname

# class ciobjectSchema(ma.ModelSchema):
#     class Meta:
#         model = ciobject 
