from django.test import TestCase
from django.core.urlresolvers import reverse


class APIArrangementListCreateViewTestCase(TestCase):

    def test_arrangement_create_list_api_view(self):
        json_response = self.client.post(reverse('arrangement_list_create_api_view')).json()
        self.assertCountEqual(json_response.keys(), ['price'])


class APIFloristListCreateViewTestCase(TestCase):

    def test_florist_create_list_api_view(self):
        json_response = self.client.post(reverse('florist_list_create_api_view')).json()
        self.assertCountEqual(json_response.keys(), ['user', 'arrangement_history'])


class APIBasketListCreateViewTestCase(TestCase):

    def test_basket_create_list_api_view(self):
        json_response = self.client.post(reverse('basket_list_create_api_view')).json()
        self.assertCountEqual(json_response.keys(), ['arrangement'])


class APIBuyerListCreateViewTestCase(TestCase):

    def test_buyer_create_list_api_view(self):
        json_response = self.client.post(reverse('buyer_list_create_api_view')).json()
        self.assertCountEqual(json_response.keys(), ['order_history', 'user'])
