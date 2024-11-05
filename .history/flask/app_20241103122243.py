from flask import Flask, jsonify, request
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

#Create Items
posts = [
    {'id': 1, 'title': 'First Post', 'content': 'Content'},
    {'id': 2, 'title': 'Second Post', 'content': 'Content'},
]

#Get Posts
@app.route("/posts", methods=['GET'])
def get_posts():
    return jsonify(posts)

#Get Post by ID
@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post= next((post for post in post if post['id'] == post_id), None)
    if post is not None:
        return jsonify(post)
    else:
        return jsonify ({'error': 'Post in not Find'}), 404
    
#ADD New Post
@app.route('/posts', methods=['POST'])
def create_post():
    new_post = request.get_json()
    new_post['id'] = len(posts) + 1
    posts.append(new_post)
    return jsonify(new_post), 201


#DELETE POST
@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    global posts  # Используйте глобальную переменную для доступа к списку постов
    post = next((post for post in posts if post['id'] == post_id), None)
    if post is not None:
        posts = [p for p in posts if p['id'] != post_id]  # Удаление поста из списка
        return jsonify({'message': 'Пост удален успешно'}), 204  # Статус 204 без тела
    else:
        return jsonify({'error': 'Пост не найден'}), 404  # Статус 404 с сообщением


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=8080)