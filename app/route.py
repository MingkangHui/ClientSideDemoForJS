from app import  app
from flask import render_template,escape, url_for


@app.route('/')
def index():
    user={'name':'qaq'}
    return render_template('index.html',user=user)
#it's just a test for flask, ignore that

@app.route('/auth')
def authorization():

    return render_template('googleAuth.html')
#this one is for google endpoints,it is certainly kind of easy to use

@app.route('/authJS')
def authorizationJS():

    return render_template('googleAuthJS.html')
#this one is for javascript client libaray api, it could be used to log in,I have no idea about how it works


@app.route('/authGapi')
def authorizationGapi():
    return render_template('googleAuthGapi.html')


@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % (username)

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % (subpath)


@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/about')
def about():
    return 'The about page'