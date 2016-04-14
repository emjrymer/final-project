from rest_framework import serializers
from django.contrib.auth.models import User
from florist_app.models import Arrangement, Cart, Florist, Buyer


class ArrangementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Arrangement


class CartSerializer(serializers.ModelSerializer):
    arrangement_name = serializers.SerializerMethodField()
    arrangement_price = serializers.SerializerMethodField()
    arrangement_photo = serializers.SerializerMethodField()

    def get_arrangement_name(self, obj):
        return obj.arrangement.name

    def get_arrangement_price(self, obj):
        return obj.arrangement.price

    def get_arrangement_photo(self, obj):
        return obj.arrangement.photo

    class Meta:
        model = Cart



class FloristSerializer(serializers.ModelSerializer):

    class Meta:
        model = Florist


class BuyerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Buyer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('first_name', 'email', 'username', 'password')

    def create(self, validated_data):
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            if key == 'password':
                instance.set_password(value)
            else:
                setattr(instance, key, value)
        instance.save()
        return instance
