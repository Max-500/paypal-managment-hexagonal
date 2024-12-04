# Usa la imagen oficial de Node.js 22.11.0
FROM node:22.11.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de tu proyecto al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que corre tu aplicación
EXPOSE 3001

# Comando para ejecutar tu aplicación
CMD ["npm", "start"]
