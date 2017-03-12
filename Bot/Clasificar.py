import sys
gg = sys.stdout
hh = sys.stderr
f = open('/dev/null', 'w')
sys.stdout = f
sys.stderr = f
#import ImageUtils as ui
import numpy
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.optimizers import Adadelta
from keras.preprocessing import image
from keras.models import model_from_json
from keras.applications.resnet50 import preprocess_input
import urllib
sys.stdout = gg
sys.stderr = hh

modelos = ['Original Superstar', 'Stan Smith', 'Gazelle', 'Torsion', 'NMD_R1', 'Equipment', 'Ultra Boost']

def maximum(lista):
	maximo = 0
	for n in numpy.arange(len(lista)):
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

imagen = sys.argv[1]
photo = open(imagen_descargar, 'wb')
x = urllib.urlopen(imagen).read()
photo.write(x)
photo.close()

img = image.load_img(imagen_descargar, target_size=(150, 150))
x = image.img_to_array(img)
x = numpy.expand_dims(x, axis=0)
x = preprocess_input(x)

#X_train = ui.load_image(imagen_descargar)
#X_train = numpy.array([X_train]).reshape(numpy.array([X_train]).shape[0], 1, 150, 150)
#X_train /= 255

#yhat = model.predict(X_train)
yhat = model.predict(x)
print(modelos[maximum(yhat[0])])