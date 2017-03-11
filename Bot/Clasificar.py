import sys
import ImageUtils as ui
import numpy
from keras.datasets import cifar10
from keras.models import Sequential
from keras.layers import Dense
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.optimizers import Adadelta
from keras.models import model_from_json
import numpy as np
import sys
import urllib

def maximum(lista):
	maximo = 0
	for n in np.arange(len(lista)):
		if ( lista[n] > maximo):
			maximo = lista[n]
			resultado = n

	return n

fichero_pesos = './Authomatic/first_try.h5'
fichero_modelo = './Authomatic/modelo.json'
imagen_descargar = './Authomatic/image.jpg'

model = model_from_json(open(fichero_modelo).read())
model.load_weights(fichero_pesos)
model.compile(optimizer='adadelta', loss='categorical_crossentropy')

#imagen = sys.argv[1]
#photo = open(imagen_descargar, 'wb')
#photo.write(urllib.urlopen(imagen).read())
#photo.close()

X_train = ui.load_image(imagen_descargar)
X_train = numpy.array([X_train]).reshape(numpy.array([X_train]).shape[0], 1, 150, 150)
X_train /= 255

yhat = model.predict(X_train)
print(maximum(yhat[0]))