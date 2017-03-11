# -*- coding: utf-8 -*-
"""
Created on Sat Mar 11 00:23:19 2017

@author: Javier Fumanal Idocin


"""
import sys
import os
from PIL import Image, ImageOps
from scipy.misc import imshow
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from random import shuffle



################################################
# FUNCIONES
################################################

def pasarImagenGrises(imagen):
    #img = mpimg.imread(imagen)     
    img = imagen.convert('LA')   
    return img

def resizeImage(img, tamanyo):
    basewidth = tamanyo
    #img = Image.open(imagen)
    x, y = (img.size)
    half_the_width = img.size[0] / 2
    half_the_height = img.size[1] / 2
    if ( x < y):
        recorte = x/2
    else:
        recorte = y/2
    img = img.crop(
    (
        half_the_width - recorte,
        half_the_height - recorte,
        half_the_width + recorte,
        half_the_height + recorte
    )
)
    
    wpercent = (basewidth / float(img.size[0]))
    hsize = int((float(img.size[1]) * float(wpercent)))
    img = img.resize((basewidth, hsize), Image.ANTIALIAS)
    
    return img
    
def cargarImagenes ( direccion ):
    #Toma un directorio con las imagenes de entrenamiento
    pr = []
    nombres = []
    for name in os.listdir(direccion):
        pr.append(load_image( direccion+name ))    
        nombres.append(direccion+name)
    return pr, nombres

def load_image( infilename ) :
    img = Image.open( infilename ).convert('LA')
    img = resizeImage( img , 150)
    img.load()
    data = np.asarray( img )
    resultado = np.zeros((150,150))
    for i in np.arange(150):
        for j in np.arange(150):
            resultado[i][j] = data[i][j][0]
    return resultado


def generar_datos_sinteticos(  direccion ):
    ficheros = [os.path.join(direccion,fn) for fn in next(os.walk(direccion))[2]]
    for imagen in ficheros:
        ruta, nombre = imagen.split(".jpg")
        original = Image.open(imagen)
        rot45 = original.rotate(45)
        rot45.save(ruta + "(1).jpg")
        rot90 = original.rotate(90)
        rot90.save(ruta + "(1).jpg")
        rot135 = original.rotate(135)
        rot135.save(ruta + "(1).jpg")
        rot180 = original.rotate(180)
        rot180.save(ruta + "(1).jpg")
        rot225 = original.rotate(225)
        rot225.save(ruta + "(1).jpg")
        rot270 = original.rotate(270)
        rot270.save(ruta + "(1).jpg")
        rot315 = original.rotate(315)
        rot315.save(ruta + "(1).jpg")
        mirror = ImageOps.mirror(original)
        mirror.save(ruta + "(1).jpg")
        
def leerDatos( folder_images ):
    imagenes, rutas = cargarImagenes( folder_images )
    for n in np.arange(len(rutas)):
            nombre = rutas[n].split("\\")[-1]
            label = nombre.split("(1)")[0]
            label = label.split("_")[1]
            label = label.split(".jpg")[0]
            rutas[n] = int(label)

    index_random = np.arange(len(rutas))
    np.random.shuffle(index_random)
    imagenes = [imagenes[i] for i in index_random]
    rutas = [rutas[i] for i in index_random]
    
    imagenes_test = imagenes[1:int(len(rutas)*0.2)]
    labels_test = rutas[1:int(len(rutas)*0.2)]

    imagenes_train = imagenes[len(labels_test):]
    labels_train = rutas[len(labels_test):]

    return imagenes_train, labels_train, imagenes_test, labels_test

################################################
#pr = resizeImage(r'C:\Users\javi-\Dropbox\Capturas de pantalla\Halo.png', 250)
#pr
#pr = prpasarImagenGrises(pr)
#if "__init__" == __main__:
ruta = 'C:\\Users\\javi-\\Documents\\GitHub\\ucode17\\Bot\\fotos\\train\\Blancas\\'
x_train, y_train, X_test, y_test = leerDatos(ruta)
