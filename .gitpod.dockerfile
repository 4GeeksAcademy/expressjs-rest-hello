FROM gitpod/workspace-postgres
RUN npm i typescript -g && npm i typeorm -g && npm i heroku -g
