# bibliopolis-nodejs

## :book: Instalación
1) Clona el proyecto en la ruta de tu elección
```bash
git clone https://github.com/eduqr/bibliopolis-nodejs.git
```

2) Entra a la carpeta
```bash
cd bibliopolis-nodejs/
```

3) Abre el proyecto en vscode
```bash
code .
```
## :wrench: Configuración
1) Abre una terminal en vscode
* Teclados en español: <kbd>Ctrl</kbd> + <kbd>ñ</kbd>
* Teclados en inglés: <kbd>Ctrl</kbd> + <kbd>`</kbd>

2) Instala las dependencias del proyecto
```bash
npm install
```
3) Crea el archivo `.env` dependiendo de tu terminal
* cmd:
```bash
echo. > .env
```
* git bash:
```bash
touch .env
```
4) Coloca lo siguiente en el archivo `.env`, reemplaza los datos necesarios y guarda con <kbd>Ctrl</kbd> + <kbd>s</kbd>
```env
PORT=8888
DBHOST=localhost
DBUSER=root
DBPASS=mypassword**
DBNAME=bibliopolisdb
```
5) Para tener la base de datos da clic en cada uno de estos enlaces
* [Crear bibliopolisdb](https://github.com/eduqr/bibliopolis-nodejs/blob/main/dbScripts/create.md)
* [Procedimientos almacenados](https://github.com/eduqr/bibliopolis-nodejs/blob/main/dbScripts/storedProcedures.md)
* [Datos de prueba](https://github.com/eduqr/bibliopolis-nodejs/blob/main/dbScripts/dummyData.md)
6) Copia su contenido y pégalo en la consola de [phpmyadmin](http://localhost/phpmyadmin/index.php?route=/server/sql)
7) Ejecuta los scripts
8) Regresa a vscode y en la terminal ejecuta el comando para iniciar el proyecto
```bash
npm run server
```
Ahora cada vez que abras el proyecto solo necesitas ejecutar el comando anterior :pray:
