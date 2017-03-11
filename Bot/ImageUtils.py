# -*- coding: utf-8 -*-
"""
Created on Sat Mar 11 00:23:19 2017

@author: Javier Fumanal Idocin


"""
import sys
import os
from PIL import Image, ImageOps
import numpy as np

################################################
# FUNCIONES
################################################

def cargarImagenes ( direccion ):
    #Toma un directorio con las imagenes de entrenamiento
    ficheros = [os.path.join(direccion,fn) for fn in next(os.walk(direccion))[2]]
    pr = []
    for n in np.arange(len(ficheros)):
        pr.append(load_image( ficheros[n] ))    
    
    return pr

def load_image( infilename ) :
    img = Image.open( infilename ).getData()
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
        
        
################################################