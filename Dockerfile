FROM node:6.11.0
WORKDIR /app
ADD . /app
RUN ["npm", "install"]
EXPOSE 3000
CMD ["npm", "start"]
