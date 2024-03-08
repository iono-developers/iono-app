from .models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# I could have easily used the default TokenObtainPairSerializer, 
# but I believe that preserving the username is crucial. 
# Therefore, I extended the class and added this feature.

# TODO: Future Davide here, does it tho?
class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token