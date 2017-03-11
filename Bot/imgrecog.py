from keras.preprocessing.image import ImageDataGenerator
from keras.models import Sequential
from keras.layers import Convolution2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
from keras.models import model_from_json
import urllib
import ImageUtils
import sys


# dimensions of our images.
img_width, img_height = 150, 150

train_data_dir = 'fotos/train'
validation_data_dir = 'fotos/validation'
nb_train_samples = 32
nb_validation_samples = 32
nb_epoch = 5

fichero_pesos = './Authomatic/first_try.h5'
fichero_modelo = './Authomatic/modelo.json'


def entrenar():
	model = Sequential()
	model.add(Convolution2D(32, 3, 3, input_shape=(img_width, img_height, 3)))
	model.add(Activation('relu'))
	model.add(MaxPooling2D(pool_size=(2, 2)))

	model.add(Convolution2D(32, 3, 3))
	model.add(Activation('relu'))
	model.add(MaxPooling2D(pool_size=(2, 2)))

	model.add(Convolution2D(64, 3, 3))
	model.add(Activation('relu'))
	model.add(MaxPooling2D(pool_size=(2, 2)))

	model.add(Flatten())
	model.add(Dense(64))
	model.add(Activation('relu'))
	model.add(Dropout(0.5))
	model.add(Dense(1))
	model.add(Activation('sigmoid'))

	model.compile(loss='binary_crossentropy',
	              optimizer='rmsprop',
	              metrics=['accuracy'])

	# this is the augmentation configuration we will use for training
	train_datagen = ImageDataGenerator(
	        rescale=1./255,
	        shear_range=0.2,
	        zoom_range=0.2,
	        horizontal_flip=True)

	# this is the augmentation configuration we will use for testing:
	# only rescaling
	test_datagen = ImageDataGenerator(rescale=1./255)

	train_generator = train_datagen.flow_from_directory(
	        train_data_dir,
	        target_size=(img_width, img_height),
	        batch_size=32,
	        class_mode='binary')

	validation_generator = test_datagen.flow_from_directory(
	        validation_data_dir,
	        target_size=(img_width, img_height),
	        batch_size=32,
	        class_mode='binary')

	model.fit_generator(
	        train_generator,
	        samples_per_epoch=nb_train_samples,
	        nb_epoch=nb_epoch,
	        validation_data=validation_generator,
	        nb_val_samples=nb_validation_samples)

	model.save_weights(fichero_pesos)
	json_string = model.to_json()
	open(fichero_modelo, 'w').write(json_string)

#-------------Main-----------

if len(sys.argv) > 1 and sys.argv[1] == '-i':
	entrenar()
elif len(sys.argv) > 1:
	model = model_from_json(open(fichero_modelo).read())
	model.load_weights(fichero_pesos)
	model.compile(optimizer='rmsprop', loss='binary_crossentropy')

	imagen = sys.argv[1]
	urllib.urlretrieve(imagen, imagen_descargar)
	img = ImageUtils.load_image(imagen_descargar)
	resultado = model.predict(img)

	#os.remove(imagen_descargar,*,dir_fd=None)

	print(resultado)

