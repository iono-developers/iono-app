# tests.py

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status



class AuthenticationTests(TestCase):
    
    """
    This Django test suite, named AuthenticationTests, evaluates the functionality 
    of user authentication in a REST API. The suite includes tests for login with 
    incorrect credentials, token creation upon providing correct credentials, 
    token refreshing, and proper logout functionality. Additionally, it examines
    the behavior of the system when attempting an invalid logout. Each test is
    designed to verify the expected outcomes and interactions with the
    authentication endpoints.
    """



    def setUp(self):
        # Setting up initial user data, creating two users, and initializing an API client
        self.first_user_data = {
            'username': 'firstuser',
            'email': 'firstuser@example.com',
            'password': 'firstuserpassword'
        }
        self.second_user_data = {
            'username': 'seconduser',
            'email': 'seconduser@example.com',
            'password': 'seconduserpassword'
        }
        
        self.user = get_user_model().objects.create_user(**self.first_user_data)
        self.user = get_user_model().objects.create_user(**self.second_user_data)
        
        self.client = APIClient()
    
        
    def test_login_with_wrong_data(self):
        # Test if login fails with incorrect credentials
        dumb_data = {
            'username' : 'fakeuser',
            'password' : 'fakeuserpassword'
        }
        response = self.client.post('/auth/token/', data=dumb_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    
    def test_login_with_wrong_password(self):
        # Test if login with correct name and wrong password
        dumb_data = {
            'username' : 'firstuser',
            'password' : 'wrongpassword'
        }
        response = self.client.post('/auth/token/', data=dumb_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    
    def test_login_with_another_user_password(self):
        # Test if login with correct name and wrong password
        dumb_data = {
            'username' : 'firstuser',
            'password' : 'seconduserpassword'
        }
        response = self.client.post('/auth/token/', data=dumb_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    
    def test_login_with_empty_data(self):
        # Test if login with correct name and wrong password
        dumb_data = {}
        response = self.client.post('/auth/token/', data=dumb_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_token_creation(self):
        # Test if a valid token is generated when providing correct credentials
        response = self.client.post('/auth/token/', data=self.first_user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        
        # Double check token validity
        access_token = response.data['access']
        response = self.client.post('/auth/token/verify/', data = {'token': access_token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_token_refresh(self):
        # Obtain an initial token
        response = self.client.post('/auth/token/', data=self.first_user_data)
        access_token = response.data['access']
        refresh_token = response.data['refresh']

        # Test if a new access token is generated when refreshing with a valid refresh token
        response = self.client.post('/auth/token/refresh/', data = {'refresh': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        new_access_token = response.data['access']
        self.assertNotEqual(access_token, new_access_token)

    
    def test_expired_token_refresh(self):
        # Obtain an initial token
        response = self.client.post('/auth/token/', data=self.first_user_data)
        access_token = response.data['access']
        refresh_token = response.data['refresh']

        # Test if a new access token is generated when refreshing with a valid refresh token
        response = self.client.post('/auth/token/refresh/', data = {'refresh': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        new_access_token = response.data['access']
        self.assertNotEqual(access_token, new_access_token)
        
        # Test if the expired token return the correct status
        response = self.client.post('/auth/token/refresh/', data = {'refresh': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_logout(self):
        # Obtain an initial token
        response = self.client.post('/auth/token/', data=self.first_user_data)
        refresh_token = response.data['refresh']
        access_token = response.data['access']

        # Test if the refresh token is blacklisted upon logout
        response = self.client.post('/auth/logout/',
                                    headers={'Authorization': 'Bearer ' + access_token},
                                    data={'refresh_token': refresh_token})
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)

        # Attempt to use the blacklisted refresh token for a new access token
        response = self.client.post('/auth/token/refresh/', data={'refresh': refresh_token})
        
        # Check if the response indicates unauthorized access
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Optionally, check if the response contains a specific message or data indicating token invalidity
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'], 'Token is blacklisted')


    def test_invalid_logout_authentication(self):
        # Test if the server responds appropriately to an invalid logout request
        response = self.client.post('/auth/logout/', data={})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    
    def test_invalid_logout_refresh_token(self):
        # Obtain an initial token
        response = self.client.post('/auth/token/', data=self.first_user_data)
        access_token = response.data['access']
        
        # Test if the server responds appropriately to an invalid logout request
        response = self.client.post('/auth/logout/',
                                    headers={'Authorization': 'Bearer ' + access_token},
                                    data={'refresh' : access_token})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
