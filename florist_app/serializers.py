
from rest_framework import serializers
from florist_app.models import Arrangement, Basket, Florist, Buyer


class ArrangementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Arrangement

class BasketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Basket

class FloristSerializer(serializers.ModelSerializer):

    class Meta:
        model = Florist

class BuyerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Buyer
