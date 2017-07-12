FROM registry.twilio.com/library/base-alpine-node:6.11.1
WORKDIR /app
ADD . /app
RUN ["npm", "install"]
EXPOSE 3000
CMD ["npm", "start"]
