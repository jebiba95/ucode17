# -*- coding: utf-8 -*-
"""
Created on Sat Mar 11 00:23:19 2017

@author: Javier Fumanal Idocin


"""
import sys
import os
from PIL import Image, ImageOps
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg



################################################
# FUNCIONES
################################################

def pasarImagenGrises(imagen):
    #img = mpimg.imread(imagen)     
    img = imagen.convert('LA')   
    return img

def resizeImage(imagen, tamanyo):
    basewidth = tamanyo
    img = Image.open(imagen)
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
    ficheros = [os.path.join(direccion,fn) for fn in next(os.walk(direccion))[2]]
    pr = []
    for n in np.arange(len(ficheros)):
        pr.append(load_image( ficheros[n] ).convert('LA'))    
    
    return pr, ficheros

def load_image( infilename ) :
    img = resizeImage(infilename, 250)
    data = np.asarray( img, dtype="int32" )
    return numpy.fromstring(image.tostring(), dtype='uint8', count=-1, sep='').reshape(image.shape + (len(image.getbands()),))

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
            label = nombre.split("(1)")[0][-1]
            rutas[n] = label
    imagenes_test = imagenes[1:(len(rutas)*0.2)]

################################################
#pr = resizeImage(r'C:\Users\javi-\Dropbox\Capturas de pantalla\Halo.png', 250)
#pr
#pr = prpasarImagenGrises(pr)