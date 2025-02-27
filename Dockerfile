# Usa una imagen base de Node.js
FROM node:22

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Habilitar yarn
RUN corepack enable yarn

# Comando por defecto para mantener el contenedor en ejecución
CMD ["tail", "-f", "/dev/null"]
