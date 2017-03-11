import numpy
from keras.datasets import cifar10
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Dropout
from keras.layers import Flatten
from keras.constraints import maxnorm
from keras.optimizers import SGD
from keras.layers.convolutional import Convolution2D
from keras.layers.convolutional import MaxPooling2D
from keras.utils import np_utils
from keras import backend
from keras.utils import np_utils
import ImageUtils

backend.set_image_dim_ordering('th')

fichero_pesos = './Authomatic/first_try.h5'
fichero_modelo = './Authomatic/modelo.json'
imagen_descargar = './Authomatic/image.jpg'

capas_extra = 10

# fix random seed for reproducibility
seed = 7
numpy.random.seed(seed)
image_folder = "C:\\Users\\javi-\\Documents\\Todas\\Todas\\"

X_train, y_train, X_test, y_test = ImageUtils.leerDatos(image_folder)
X_train = numpy.array(X_train).reshape(numpy.array(X_train).shape[0], 1, 150, 150)
X_test = numpy.array(X_test).reshape(numpy.array(X_test).shape[0], 1, 150, 150)
X_train = X_train.astype('float32')
X_test = X_test.astype('float32')
X_train /= 255
X_test /= 255

output = set([]) 
for n in y_train:
	output.add(n)
num_classes = max(output)

y_train_vector = []
y_test_vector = []

for label in y_train:
	ceros = numpy.zeros(num_classes)
	ceros[label-1] = 1
	y_train_vector.append(ceros)

for label in y_test:
	ceros = numpy.zeros(num_classes)
	ceros[label-1] = 1
	y_test_vector.append(ceros)

#Create model
model = Sequential()
model.add(Convolution2D(32, 3, 3, input_shape=X_train.shape[1:], activation='relu', border_mode='same'))
model.add(Dropout(0.2))
model.add(Convolution2D(32, 3, 3, activation='relu', border_mode='same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Convolution2D(64, 3, 3, activation='relu', border_mode='same'))
model.add(Dropout(0.2))
model.add(Convolution2D(64, 3, 3, activation='relu', border_mode='same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Convolution2D(128, 3, 3, activation='relu', border_mode='same'))
model.add(Dropout(0.2))
model.add(Convolution2D(128, 3, 3, activation='relu', border_mode='same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dropout(0.2))
model.add(Dense(1024, activation='relu'))
model.add(Dropout(0.2))
for i in numpy.arange(capas_extra):
	model.add(Dense(512, activation='relu'))
	model.add(Dropout(0.2))
model.add(Dense(512, activation='relu'))
model.add(Dropout(0.2))
model.add(Dense(num_classes, activation='softmax'))
# Compile model
epochs = 25
lrate = 0.01
decay = lrate/epochs
sgd = SGD(lr=lrate, momentum=0.9, decay=decay, nesterov=False)
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])
print(model.summary())

# Fit the model
model.fit(numpy.array(X_train), numpy.array(y_train_vector), validation_data=(numpy.array(X_test), numpy.array(y_test_vector)), nb_epoch=epochs, batch_size=32)
# Final evaluation of the model
scores = model.evaluate(numpy.array(X_test), numpy.array(y_test_vector), verbose=0)
print("Accuracy: %.2f%%" % (scores[1]*100))

model.save_weights(fichero_pesos)
json_string = model.to_json()
open(fichero_modelo, 'w').write(json_string)