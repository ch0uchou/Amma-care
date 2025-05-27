# model_predictor.py

from catboost import CatBoostClassifier
import pandas as pd
import numpy as np
import os

# Load mô hình từ file
model = CatBoostClassifier()
model.load_model("catboost_disease_model.cbm")

# Load dữ liệu từ file CSV
df = pd.read_csv("Disease and symptoms dataset.csv")
df = df.drop_duplicates(subset=['diseases'])

# Danh sách triệu chứng (tên cột, trừ cột 'diseases')
SYMPTOM_LIST = [col for col in df.columns if col != 'diseases']

# Nhãn bệnh tiếng Anh
LABELS = df['diseases'].tolist()

def preprocess_symptoms(symptom_text: str):
    """
    Chuyển văn bản triệu chứng tiếng Anh thành vector 0/1
    (Yêu cầu: symptom_text phải chứa symptom đúng với tên trong SYMPTOM_LIST)
    """
    symptom_text = symptom_text.lower()
    vector = [1 if symptom.lower() in symptom_text else 0 for symptom in SYMPTOM_LIST]
    return np.array(vector).reshape(1, -1)

def predict_disease(symptom_text: str):
    """
    Dự đoán bệnh từ văn bản triệu chứng tiếng Anh
    """
    vector = preprocess_symptoms(symptom_text)
    pred_index = int(model.predict(vector)[0])
    if 0 <= pred_index < len(LABELS):
        return LABELS[pred_index]
    return "Unknown disease"
