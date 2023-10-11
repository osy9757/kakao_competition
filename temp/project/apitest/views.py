from django.shortcuts import render
import cv2
import numpy as np
from django.http import JsonResponse
from django.views import View
from django.core.files.storage import FileSystemStorage
import os
from PIL import Image
#from .forms import UploadImageForm  # 업로드 폼 정의가 필요함
#from .models import Image
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.models import Model
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from sklearn.metrics.pairwise import cosine_similarity
from django.conf import settings


# Create your views here.
def test(request):
    return render(request, 'test.html')

def upload_image(request):
    if request.method == 'POST':
        image = request.FILES['image'] if 'image' in request.FILES else None
        if image:
            fs = FileSystemStorage()
            filename = fs.save(image.name, image)
            uploaded_file_url = fs.url(filename)
            return render(request, 'test.html', {'uploaded_file_url': uploaded_file_url})
    return redirect('test') 

'''
class ImageSimilarityView(View):
    def post(self, request, *args, **kwargs):
        # 1. 이미지 파일 저장
        image = request.FILES['image']

        if not image:
            return render(request,'error.html',{'error' : 'No image'})

        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        #file_path = fs.url(filename)
        file_path = 'C:\\Users\\user\\Desktop\\kakao_temp\\kakao_competition\\temp\\project\\2927965_sqv94RD.jpg'
        # 경로 문제같은데
        try:
            Image.open(file_path)
        except:
            print(file_path)
            return render(request,'error.html',{'error' : 'invalid img'})
        print(file_path)
        # 2. 모델 로드
        vgg_model = VGG16(weights='imagenet')
        # saved_features 로드 로직 
        file_path = os.path.join(settings.BASE_DIR, 'model', 'imgs_features.npy')
        saved_features = np.load(file_path, allow_pickle=True)

        # 3. 특성 추출
        img = load_img(file_path, target_size=(224, 224))
        img_array = img_to_array(img)
        img_array_expanded_dims = np.expand_dims(img_array, axis=0)
        preprocessed_img = preprocess_input(img_array_expanded_dims.copy())
        new_img_feature = vgg_model.predict(preprocessed_img)
        
        # 4. 코사인 유사도 계산
        similarity_scores = cosine_similarity(new_img_feature, saved_features)
        
        # 5. 가장 유사한 이미지 선택
        top_similar_indices = np.argsort(similarity_scores[0])[-3:][::-1]
        image_folder_path = '/kakao_competition/temp/project/apitest/pictures'
        all_images = os.listdir(image_folder_path)
        similar_image_paths = [os.path.join(image_folder_path, all_images[idx]) for idx in top_similar_indices]

        # 7. HTML 페이지에 이미지 출력
        context = {'image_paths': similar_image_paths}
        return render(request, 'test.html', context)
'''

class ImageSimilarityView(View):
    def get(self, request, *args, **kwargs):
        # 2. 모델 로드
        vgg_model = VGG16(weights='imagenet')
        
        # saved_features 로드 로직 
        saved_features_file_path = os.path.join('model', 'imgs_features.npy')
        saved_features = np.load(saved_features_file_path, allow_pickle=True)
        
        # 1. 특정 이미지의 경로 지정
        specific_image_path = '/kakao_competition/temp/project/apitest/pictures2/거제 해금강.jpg'
        
        # 3. 특성 추출
        img = load_img(specific_image_path, target_size=(224, 224))
        img_array = img_to_array(img)
        img_array_expanded_dims = np.expand_dims(img_array, axis=0)
        preprocessed_img = preprocess_input(img_array_expanded_dims.copy())
        target_img_feature = vgg_model.predict(preprocessed_img)
        
        # 4. 코사인 유사도 계산
        similarity_scores = cosine_similarity(target_img_feature, saved_features)
        
        # 5. 가장 유사한 이미지 선택
        top_similar_indices = np.argsort(similarity_scores[0])[-3:][::-1]
        
        image_folder_path = '/kakao_competition/temp/project/apitest/pictures2'
        web_image_folder_path = '/media/images'

        all_images = os.listdir(image_folder_path)
        similar_image_paths = [os.path.join(image_folder_path, all_images[idx]) for idx in top_similar_indices]
        
        web_specific_image_path = '/media/거제 해금강.jpg',

        # 6. HTML 페이지에 이미지 출력
        context = {'image_paths': similar_image_paths,
                   'specific_image_path': '/media/거제 해금강.jpg'}
        return render(request, 'test.html', context) 
    
    


'''
import os
import numpy as np
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import Model
from sklearn.metrics.pairwise import cosine_similarity
from django.shortcuts import render
from django.conf import settings
from apitest.models import UploadedImage
from apitest.forms import ImageUploadForm
import os

# 경로 설정
#imgs_path = '/kakao_competition/temp/project/apitest/pictures'
import os
from django.conf import settings

imgs_path = os.path.join(settings.BASE_DIR, 'apitest/pictures')


# VGG16 모델 로드
vgg_model = VGG16(weights='imagenet')
feat_extractor = Model(inputs=vgg_model.input, outputs=vgg_model.get_layer("fc2").output)

# 이미지 파일 경로 가져오기
files = [os.path.join(imgs_path, x) for x in os.listdir(imgs_path) if x.lower().endswith('.jpg')]

# 이미지 특징 추출 및 저장
imgs_features = []
for file in files:
    original = load_img(file, target_size=(224, 224))
    numpy_image = img_to_array(original)
    image_batch = np.expand_dims(numpy_image, axis=0)
    processed_image = preprocess_input(image_batch.copy())
    imgs_features.append(feat_extractor.predict(processed_image))

imgs_features = np.vstack(imgs_features)

# 유사 이미지 추출 함수
def get_similar_images(image_path, top_n=3):
    # 입력 이미지 전처리
    input_img = load_img(image_path, target_size=(224, 224))
    input_img_array = img_to_array(input_img)
    input_img_batch = np.expand_dims(input_img_array, axis=0)
    input_processed_img = preprocess_input(input_img_batch.copy())
    
    # 특징 추출
    input_img_features = feat_extractor.predict(input_processed_img)
    
    # 코사인 유사도 계산
    similarities = cosine_similarity(input_img_features, imgs_features)[0]
    similar_idx = np.argsort(similarities)[::-1][:top_n]
    similar_image_paths = [files[idx] for idx in similar_idx]
    
    return similar_image_paths

# 테스트
#similar_images = get_similar_images('/kakao_competition/temp/project/apitest/pictures/some_image.jpg', top_n=3)

def image_similarity_view(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            image_path = os.path.join(settings.MEDIA_ROOT, form.instance.image.name)
            
            # 유사한 이미지를 찾는 함수 호출
            similar_images = get_similar_images(image_path, top_n=3)
            
            # 이미지 경로를 MEDIA_URL에 대한 상대 경로로 변환
            similar_images_relpath = [os.path.join(settings.MEDIA_URL, os.path.basename(image)) for image in similar_images]
            
            return render(request, 'test.html', {'form': form, 'image_paths': similar_images_relpath})
    else:
        form = ImageUploadForm()
    return render(request, 'test.html', {'form': form})

'''
