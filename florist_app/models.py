from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Arrangement(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    price = models.FloatField()
    photo = models.ImageField(upload_to='uploads', null=True, blank=True)
    rating = models.IntegerField(null=True)
    florist = models.ForeignKey('florist_app.Florist', null=True)
    time_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-time_created"]


class Cart(models.Model):
    notes = models.TextField(blank=True)
    time_created = models.DateTimeField(auto_now_add=True)
    arrangement = models.ForeignKey(Arrangement)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-time_created"]


class Florist(models.Model):
    user = models.OneToOneField("auth.User")
    time_created = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(null=True)

    def __str__(self):
        return "{} - {}".format(self.user, self.time_created)


class Buyer(models.Model):
    user = models.OneToOneField("auth.User")
    time_created = models.DateTimeField(auto_now_add=True)
    order_history = models.ManyToManyField(Cart)

    def __str__(self):
        return self.user


# method for creating florist
@receiver(post_save, sender='auth.User')
def create_florist(sender, **kwargs):
    user_instance = kwargs.get('instance')
    if kwargs.get('created'):
       Florist.objects.create(user=user_instance)
