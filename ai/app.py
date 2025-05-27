from flask import Flask, render_template, request, jsonify
from model_predictor import predict_disease
import openai
import os
from dotenv import load_dotenv

load_dotenv()

# Cấu hình API Key cho OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json["message"]

    # Dự đoán bệnh từ mô hình
    predicted_disease = predict_disease(user_msg)

    # Tạo prompt gửi đến OpenAI
    messages = [
        {
            "role": "system",
            "content": "Bạn là trợ lý y tế, giúp người dùng chẩn đoán và đặt lịch hẹn khám bệnh."
        },
        {
            "role": "user",
            "content": user_msg
        },
        {
            "role": "assistant",
            "content": f"Theo mô hình AI, người dùng có thể mắc: {predicted_disease}."
        }
    ]

    # Gọi OpenAI ChatCompletion
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=300,
            temperature=0.7
        )
        reply = response.choices[0].message.content
    except Exception as e:
        reply = f"Đã xảy ra lỗi khi gọi OpenAI: {str(e)}"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
