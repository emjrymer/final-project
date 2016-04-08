from django.db import models


class Arrangement(models.Model):
    price = models.FloatField()
    photo = models.ImageField(upload_to='uploads', null=True, blank=True)
    rating = models.IntegerField(null=True)

    def __str__(self):
        return self.price


class Basket(models.Model):
    notes = models.TextField(blank=True)
    time_created = models.DateTimeField(auto_now_add=True)
    arrangement = models.ManyToManyField(Arrangement)

    def __str__(self):
        return self.notes


class Florist(models.Model):
    user = models.OneToOneField("auth.User")
    time_created = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(null=True)
    arrangement_history = models.ManyToManyField(Arrangement)

    def __str__(self):
        return "{} - {}".format(self.user, self.time_created)


class Buyer(models.Model):
    user = models.OneToOneField("auth.User")
    time_created = models.DateTimeField(auto_now_add=True)
    order_history = models.ManyToManyField(Basket)

    def __str__(self):
        return self.user
