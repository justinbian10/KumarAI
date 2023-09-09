FROM public.ecr.aws/lambda/nodejs:18

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=80

CMD ["app.handler"]