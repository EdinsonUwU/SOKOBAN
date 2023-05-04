#!/bin/bash
# Instalar las dependencias
npm install
# Comprobar si la instalación fue exitosa
if [ $? -eq 0 ]; then
  echo "Instalación exitosa"
else
  echo "Error en la instalación"
fi
