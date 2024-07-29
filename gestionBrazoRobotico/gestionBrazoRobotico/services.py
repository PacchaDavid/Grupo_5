import requests 

def generate_request(url, params={}):
    response = requests.get(url,params=params)

    if response.status_code == 200:
        return response.json()
    
def get_random_user(params={}):
    response = generate_request('https://randomuser.me/api',{})
    if response:
        response = response.get('results')[0]   
        long_name = response.get('name').get('title') + '. ' + response.get('name').get('first') + ' ' + response.get('name').get('last')
        user = {
            'long_name': long_name,
            'country': response.get('location').get('country'),
            'city' : response.get('location').get('city'),
            'image' : response.get('picture').get('large'),
            'email' : response.get('email')
        }
        return user
    return None

def get_chiste(params={}):
    response = generate_request('https://v2.jokeapi.dev/joke/Any',params=params)
    if response:
        return response
    return None