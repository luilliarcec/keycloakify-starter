# Usa una imagen base de Node.js
FROM node:22

# Instala xdg-utils
RUN apt-get update && apt-get install -y xdg-utils

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Habilitar yarn
RUN corepack enable yarn

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 6006

# Comando por defecto para mantener el contenedor en ejecución
CMD ["tail", "-f", "/dev/null"]
